# Facebook Tools

## Purpose

Because Facebook doesn't provide a good way to unlike or unfollow page all at once.

## Credits

UI kit: <https://www.tailwind-kit.com/>

## Resources

<https://developers.facebook.com/docs/graph-api/overview/rate-limiting>
<https://stackoverflow.com/questions/17329454/facebook-graph-api-returning-empty-data-set>

## Error 

when limit reached

```json
{
   "error": {
      "message": "(#4) Application request limit reached",
      "type": "OAuthException",
      "is_transient": true,
      "code": 4,
      "fbtrace_id": "A_nAllqRcwWbBphLscSSBSA"
   }
}
```

When oauth error 

```json
{
   "error": {
      "message": "(#3) Application does not have the capability to make this API call.",
      "type": "OAuthException",
      "code": 3,
      "fbtrace_id": "ASH_Yz0HolgEJQkXE3igaVH"
   }
}
```
