# Data Input and Output

- Let's take a look at importing and exporting data with Pandas


```python
import numpy as np
import pandas as pd

```

## CSV

### CSV Input


```python
df = pd.read_csv('../../../data/diabetes.csv')
df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>chol</th>
      <th>stab.glu</th>
      <th>hdl</th>
      <th>ratio</th>
      <th>glyhb</th>
      <th>location</th>
      <th>age</th>
      <th>gender</th>
      <th>height</th>
      <th>weight</th>
      <th>frame</th>
      <th>bp.1s</th>
      <th>bp.1d</th>
      <th>bp.2s</th>
      <th>bp.2d</th>
      <th>waist</th>
      <th>hip</th>
      <th>time.ppn</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1000</td>
      <td>203.0</td>
      <td>82</td>
      <td>56.0</td>
      <td>3.6</td>
      <td>4.31</td>
      <td>Buckingham</td>
      <td>46</td>
      <td>female</td>
      <td>62.0</td>
      <td>121.0</td>
      <td>medium</td>
      <td>118.0</td>
      <td>59.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>29.0</td>
      <td>38.0</td>
      <td>720.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1001</td>
      <td>165.0</td>
      <td>97</td>
      <td>24.0</td>
      <td>6.9</td>
      <td>4.44</td>
      <td>Buckingham</td>
      <td>29</td>
      <td>female</td>
      <td>64.0</td>
      <td>218.0</td>
      <td>large</td>
      <td>112.0</td>
      <td>68.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>46.0</td>
      <td>48.0</td>
      <td>360.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1002</td>
      <td>228.0</td>
      <td>92</td>
      <td>37.0</td>
      <td>6.2</td>
      <td>4.64</td>
      <td>Buckingham</td>
      <td>58</td>
      <td>female</td>
      <td>61.0</td>
      <td>256.0</td>
      <td>large</td>
      <td>190.0</td>
      <td>92.0</td>
      <td>185.0</td>
      <td>92.0</td>
      <td>49.0</td>
      <td>57.0</td>
      <td>180.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1003</td>
      <td>78.0</td>
      <td>93</td>
      <td>12.0</td>
      <td>6.5</td>
      <td>4.63</td>
      <td>Buckingham</td>
      <td>67</td>
      <td>male</td>
      <td>67.0</td>
      <td>119.0</td>
      <td>large</td>
      <td>110.0</td>
      <td>50.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>33.0</td>
      <td>38.0</td>
      <td>480.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1005</td>
      <td>249.0</td>
      <td>90</td>
      <td>28.0</td>
      <td>8.9</td>
      <td>7.72</td>
      <td>Buckingham</td>
      <td>64</td>
      <td>male</td>
      <td>68.0</td>
      <td>183.0</td>
      <td>medium</td>
      <td>138.0</td>
      <td>80.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>44.0</td>
      <td>41.0</td>
      <td>300.0</td>
    </tr>
  </tbody>
</table>
</div>



### CSV Output


```python
df.to_csv('diabetes_copy.csv',index=False) # Index False is important
```

## Excel
Pandas can read and write excel files, keep in mind, this only imports data. Not formulas or images, having images or macros may cause this read_excel method to crash. 


```python
pd.read_excel('../../../data/diabetes.xls')
```

### Excel Output


```python
df.to_excel('diabetes_copy.xlsx',sheet_name='new_name')
```

### HTML Input

- Pandas read_html function will read tables off of a webpage and return a list of DataFrame objects:


```python
df = pd.read_html('http://www.fdic.gov/bank/individual/failed/banklist.html')
```


```python
df[0] # since read_html creates list of dataframes
```

# Operations
- There are many operations you can use with pandas
- We'll cover the most common ones


```python
bank = df[0]
```


```python
bank.info()
```


```python
bank.tail(10)
```

## Unique


```python
bank['ST'].unique() # unique obs
```


```python
bank['ST'].nunique() # Number of unique obs
```


```python
bank['ST'].value_counts() # counts each of the unique obs
```

## Select Data


```python
bank.head()
```


```python
bank[(bank['CERT'] < 2000) & (bank['ST'] == 'IL')]
```

## Applying Functions


```python
def divide_1000(x):
    return x / 1000
```


```python
bank['CERT'].apply(lambda x: x / 1000)
```


```python
bank['CERT'].apply(np.log)
```


```python
bank['CERT'].sum()
```

## Columns


```python
bank.columns # list columns
```


```python
del bank['Updated Date'] # permanently remove column
```


```python
bank.columns
```


```python
bank.index
```

## Sort and Order DataFrames


```python
bank.head()
```


```python
bank.sort_values(by='ST') # inplace = False by default
```

## Null Values


```python
bank.isnull()
```


```python
bank.dropna() # Seen this before
```

# SQL
The pandas.io.sql module provides a collection of query wrappers to both facilitate data retrieval and to reduce dependency on DB-specific API. Database abstraction is provided by SQLAlchemy if installed. In addition you will need a driver library for your database. Examples of such drivers are psycopg2 for PostgreSQL or pymysql for MySQL. For SQLite this is included in Python’s standard library by default. You can find an overview of supported drivers for each SQL dialect in the SQLAlchemy docs.


If SQLAlchemy is not installed, a fallback is only provided for sqlite (and for mysql for backwards compatibility, but this is deprecated and will be removed in a future version). This mode requires a Python database adapter which respect the Python DB-API.

See also some cookbook examples for some advanced strategies.

The key functions are:

- `read_sql_table(table_name, con[, schema, ...])`	
    - Read SQL database table into a DataFrame.
- `read_sql_query(sql, con[, index_col, ...])`	
    - Read SQL query into a DataFrame.
- `read_sql(sql, con[, index_col, ...])`	
    - Read SQL query or database table into a DataFrame.
- `DataFrame.to_sql(name, con[, flavor, ...])`	
    - Write records stored in a DataFrame to a SQL database.


```python
from sqlalchemy import create_engine

```


```python
engine = create_engine('sqlite:///:memory:')
```


```python
df.to_sql('temp', engine)
```


```python
sql_df = pd.read_sql('data',con=engine)
```


```python
sql_df

```
