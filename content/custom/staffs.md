---
layout: design/staffs.njk
title: Staffs
description: Staffs Description here...
pagination:
  data: collections.staffs
  size: 9
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
show_ford_store: true
show_patner: true
show_motors: true
show_nearby: true
permalink: "staff/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

