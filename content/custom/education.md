---
title: Education
description: Education description here...
layout: design/education.njk
pagination:
  data: collections.educations
  size: 1
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
image: /img/Early-Ford-V8-Foundation-Museum-A043.webp
show_ford_store: true
show_patner: true
permalink: "education/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

