# Missing Data
pandas primarily uses the value np.nan to represent missing data.

Reindexing allows you to change/add/delete the index on a specified axis. This returns a copy of the data.


```python
import pandas as pd
import numpy as np
dates = pd.date_range('20190101',periods=10)
df = pd.DataFrame(np.random.randn(10,4), 
                  index=dates, 
                  columns=list('ABCD'))
df1 = df.reindex(index=dates[0:4], columns=list(df.columns) + ['E'])
```


```python
df1.loc[dates[0]:dates[1], 'E'] = 1
```


```python
df1

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
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>0.199886</td>
      <td>0.312388</td>
      <td>1.394258</td>
      <td>-0.311931</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>0.259445</td>
      <td>-0.377668</td>
      <td>-1.481911</td>
      <td>1.805175</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>1.452134</td>
      <td>-2.576209</td>
      <td>-0.246738</td>
      <td>-1.127367</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>2.026428</td>
      <td>0.183045</td>
      <td>1.275433</td>
      <td>-0.834084</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



To drop any rows that have missing data.



```python
df1.dropna(how='any')
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
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>0.199886</td>
      <td>0.312388</td>
      <td>1.394258</td>
      <td>-0.311931</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>0.259445</td>
      <td>-0.377668</td>
      <td>-1.481911</td>
      <td>1.805175</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>



Filling missing data.


```python
df1.fillna(value='FILL VALUE')
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
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>0.199886</td>
      <td>0.312388</td>
      <td>1.394258</td>
      <td>-0.311931</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>0.259445</td>
      <td>-0.377668</td>
      <td>-1.481911</td>
      <td>1.805175</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>1.452134</td>
      <td>-2.576209</td>
      <td>-0.246738</td>
      <td>-1.127367</td>
      <td>FILL VALUE</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>2.026428</td>
      <td>0.183045</td>
      <td>1.275433</td>
      <td>-0.834084</td>
      <td>FILL VALUE</td>
    </tr>
  </tbody>
</table>
</div>



To get the boolean mask where values are nan.


```python
pd.isna(df1)
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
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
