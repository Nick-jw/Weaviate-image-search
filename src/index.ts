import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client : WeaviateClient = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080'
});

const schemaRes = await client.schema.getter().do()

const schemaConfig = {
    'class': 'Meme',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'datatype': ['blob']
        },
        {
            'name': 'text',
            'datatype': ['string']
        }
    ]
}

await client.schema
    .classCreator()
    .withClass(schemaConfig)
    .do();