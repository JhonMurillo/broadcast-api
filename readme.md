# Broadcast API

## Run in development 

1. run kafka with the next command `docker-compose up --build`
1. set env vars [.env.example](https://github.com/JhonMurillo/broadcast-api/blob/main/.env.example)
1. run `npm run dev`

## Send message 

1. http://localhost:3001/send [POST] 

1. Body

```
{
    "messages": [
        {
            "value": "Hello World"
        }
        
    ]
}
```
 3. open the file [test.html](https://github.com/JhonMurillo/broadcast-api/blob/main/test.html)
