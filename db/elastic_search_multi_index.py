import json
from elastic_app_search import Client

# Client 생성
client = Client(
    base_endpoint="bourgogne.ent.asia-northeast3.gcp.elastic-cloud.com/api/as/v1",
    api_key="private-ii879j35wf6xbdea1skne72t",
    use_https=True
)

# Engine 이름
engine_name = "bourgogne-engine"

# File 이름
file_name = "data/WINE_PRODUCT_DB_01"

# Read json
with open(f"{file_name}.json") as file:
    data = json.load(file)

# Indexing multi documents
count = 0
spl = 100
while (count < len(data)):
    data_end = (count + spl) if (count + spl) < len(data) else len(data)
    documents = data[count:data_end]
    client.index_documents(engine_name, documents)
    print(data_end, "Documents are indexed")
    count += spl
