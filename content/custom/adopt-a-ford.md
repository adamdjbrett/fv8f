---
title: Adopt-A-Ford
description: Adopt your very own vehicle.
layout: design/adopts.njk
pagination:
  data: collections.adopts
  size: 6
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
show_event_article: false
show_ford_store: false
show_patner: false
permalink: "adopt-a-ford/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

