import pandas as pd

title = "data/WINE_DB_02"

csv_data = pd.read_csv(f"{title}.csv", sep=",")

columns = [ x.lower() for x in csv_data.columns]

csv_data.columns = columns

csv_data.to_json(f"{title}.json", orient="records")