---
title: Collections Gallery
description: Image Collections Gallery page
layout: design/gallery.njk
pagination:
  data: collections.galleries
  size: 12
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
 - item5
 - item6
show_event_article: false
show_ford_store: false
show_partner: false
show_nearby: false
permalink: "collections/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

