# Data Grabber Tool
# Grabs data urls from a list of urls in a text document
FILE=$1
xargs -n 1 curl -O < $FILE
mkdir data/
mv *.csv *.data *.dat *.xlsx *.json data/
