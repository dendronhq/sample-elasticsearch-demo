GET /_cat/indices?v


PUT notes-sample
{
  "mappings": {
    "properties": {
      "created": {
        "type":   "date",
        "format": "epoch_millis"
      }
    }
  }
}

# Run this
```
cat /tmp/notes-sample.json | jq -c '.[] | {"index": {"_index": "notes-sample", "notes", "_id": .id}}, .' | curl -H'Content-Type: application/json' -XPOST localhost:9200/_bulk --data-binary @-
```

# See notes

POST notes-sample/_search
{
    "query": {
        "match_all": {}
    }
}

# See all tags
POST notes-sample/_search
{
    "query": {
        "match_all": {}
    },
    "aggs": {
        "genres": {
            "terms": {
                "field": "custom.tags.keyword",
                "size": 100
            }
        }
    },
    "_source": ""
}

# Find notes greater than a date
POST notes-sample/_search
{
    "query": {
        "bool": {
            "must": {
                "match_all": {}
            },
            "filter": {
                "range": {
                    "created": {
                        "gte": 1599606917280
                    }
                }
            }
        }
    }
}

# Find notes with a cerrtain tag
POST notes-sample/_search
{
    "query": {
        "bool": {
            "must": {
                "match_all": {}
            },
            "filter": {
                "term": {
                    "custom.tags.keyword": "pt"
                }
            }
        }
    }
}
