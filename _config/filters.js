import { DateTime } from "luxon";

export default function(eleventyConfig) {
  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
  });

  // Utility filters
  eleventyConfig.addNunjucksFilter("limit", (arr, limit) => arr.slice(0, limit));
  
  eleventyConfig.addFilter("min", (...numbers) => Math.min(...numbers));
  
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) return [];
    return n < 0 ? array.slice(n) : array.slice(0, n);
  });

  // Logging filter for debugging
  eleventyConfig.addFilter("log", value => {
    console.log(value);
    return value;
  });

  // Staff collection
  eleventyConfig.addCollection("staff", function(collectionApi) {
    const staffData = collectionApi.getAll()[0].data.staff.user || [];
    console.log("Staff data from YAML:", JSON.stringify(staffData, null, 2));

    const staffKeys = new Set();
    const postsByStaff = {};

    collectionApi.getAll().forEach(post => {
      if (post.data.staff) {
        const staffArray = Array.isArray(post.data.staff) ? post.data.staff : [post.data.staff];
        staffArray.forEach(staffKey => {
          staffKeys.add(staffKey);
          if (!postsByStaff[staffKey]) postsByStaff[staffKey] = [];
          postsByStaff[staffKey].push(post);
          console.log(`Found staff key "${staffKey}" in post "${post.data.title}"`);
        });
      }
    });

    console.log("Unique staff keys found in posts:", Array.from(staffKeys));

    const result = Array.from(staffKeys)
      .map(staffKey => {
        const staffMember = staffData.find(s => s.key === staffKey);
        if (!staffMember) {
          console.warn(`Warning: No data found for staff with key "${staffKey}"`);
          return null;
        }
        return {
          ...staffMember,
          posts: postsByStaff[staffKey] || []
        };
      })
      .filter(Boolean);

    console.log("Final staff collection:", JSON.stringify(result, null, 2));
    return result;
  });

  // Filter to get staff by key
  eleventyConfig.addFilter("getStaff", (staff, key) => {
    console.log(`Attempting to get staff with key: ${key}`);
    if (!staff || !Array.isArray(staff)) {
      console.log("Staff data is not an array:", staff);
      return null;
    }
    const result = staff.find(s => s.key === key);
    console.log(`Result for key ${key}:`, JSON.stringify(result, null, 2));
    return result;
  });

  // Filter to get posts by staff
  eleventyConfig.addFilter("getPostsByStaff", (posts, staffKey) => {
    console.log(`Attempting to get posts for staff key: ${staffKey}`);
    console.log(`Total posts: ${posts.length}`);
    
    if (!posts || !Array.isArray(posts)) {
      console.log("Posts data is not an array");
      return [];
    }
    
    const result = posts.filter(post => {
      if (!post.data.staff) {
        console.log(`No staff data for post: ${post.data.title}`);
        return false;
      }
      
      const staffArray = Array.isArray(post.data.staff) ? post.data.staff : [post.data.staff];
      const includes = staffArray.some(staff => 
        typeof staff === 'string' && typeof staffKey === 'string' && 
        staff.toLowerCase() === staffKey.toLowerCase()
      );
      console.log(`Checking post: ${post.data.title}, Staff ${staffKey} included: ${includes}`);
      
      return includes;
    });
    
    console.log(`Found ${result.length} posts for staff key "${staffKey}"`);
    result.forEach(post => console.log(`- ${post.data.title}`));
    return result;
  });

  // Other utility filters
  eleventyConfig.addFilter("getKeys", target => Object.keys(target));

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => !["all", "galleries", "events", "news","adopts","donations","educations"].includes(tag));
  });
}

