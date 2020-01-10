## Selection by label
For getting a cross section using a label:


```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
dates = pd.date_range('20190101',periods=10)
df = pd.DataFrame(np.random.randn(10,4), 
                  index=dates, 
                  columns=list('ABCD'))

```


```python
dates[0]
```




    Timestamp('2019-01-01 00:00:00', freq='D')




```python
df.loc[dates[0]]
```




    A   -1.158573
    B   -0.941688
    C    2.568583
    D    0.494481
    Name: 2019-01-01 00:00:00, dtype: float64



Selecting on a mutli-axis by label


```python
df.loc[:, ['A','D']]
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
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>-1.158573</td>
      <td>0.494481</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.683202</td>
      <td>-0.187010</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>-0.146018</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>-0.939398</td>
      <td>0.034436</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>1.135158</td>
      <td>-2.690404</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>-0.953653</td>
      <td>2.677651</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>1.677311</td>
      <td>0.462660</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.612544</td>
      <td>0.027003</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>1.106210</td>
      <td>-0.057844</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.165680</td>
      <td>-0.706584</td>
    </tr>
  </tbody>
</table>
</div>



Showing label slicing, both endpoints are *included*


```python
df.loc['20190102':'20190104', ['A', 'B']]
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-02</th>
      <td>-0.683202</td>
      <td>0.056144</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>-0.939398</td>
      <td>2.276844</td>
    </tr>
  </tbody>
</table>
</div>



Reduction in the dimensions of the returns object


```python
df.loc['20190102',['A','B']]
```




    A   -0.683202
    B    0.056144
    Name: 2019-01-02 00:00:00, dtype: float64



For getting a scalar value:


```python
df.loc[dates[0], 'A']

```




    -1.1585727488744095



## Selection by position
Select with the position of the passed integers:


```python
df.iloc[2]
```




    A    0.564102
    B    1.448998
    C    1.036779
    D   -0.146018
    Name: 2019-01-03 00:00:00, dtype: float64



By integer slices, acting similar to numpy/python:


```python
df.iloc[2:4, 0:2]
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>-0.939398</td>
      <td>2.276844</td>
    </tr>
  </tbody>
</table>
</div>



By lists of integer position locations, similar to the numpy/python style:


```python
df.iloc[[1,2,4],[0,2]]
```

For slicing rows explicitly:


```python
df.iloc[1:3, :]
```

For slicing columns explicitly:


```python
df.iloc[:,1:3]
```

For getting a value explicitly:


```python
df.iloc[1,1]

```

# Boolean indexing
Using a single column's values to select data.


```python
mask = df['A'] > 0
```


```python
mask.head()
```




    2019-01-01    False
    2019-01-02    False
    2019-01-03     True
    2019-01-04    False
    2019-01-05     True
    Freq: D, Name: A, dtype: bool




```python
df[mask] # ~ negates the mask
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
      <td>1.036779</td>
      <td>-0.146018</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>1.135158</td>
      <td>0.720135</td>
      <td>-0.771679</td>
      <td>-2.690404</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>1.677311</td>
      <td>-0.572894</td>
      <td>0.405523</td>
      <td>0.462660</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>1.106210</td>
      <td>-0.385144</td>
      <td>1.194672</td>
      <td>-0.057844</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.165680</td>
      <td>0.786776</td>
      <td>-1.079196</td>
      <td>-0.706584</td>
    </tr>
  </tbody>
</table>
</div>



Selecting values from a DataFrame where a boolean condition is met.


```python
df[df > 0]
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.568583</td>
      <td>0.494481</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>NaN</td>
      <td>0.056144</td>
      <td>0.677926</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
      <td>1.036779</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>NaN</td>
      <td>2.276844</td>
      <td>NaN</td>
      <td>0.034436</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>1.135158</td>
      <td>0.720135</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>NaN</td>
      <td>0.296899</td>
      <td>NaN</td>
      <td>2.677651</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>1.677311</td>
      <td>NaN</td>
      <td>0.405523</td>
      <td>0.462660</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.027003</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>1.106210</td>
      <td>NaN</td>
      <td>1.194672</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.165680</td>
      <td>0.786776</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



Using the `isin()` method for filtering:


```python
df2 = df.copy()
```


```python
df2['E'] = ['one','one','two','three','four','three','two','three','four','four']
```


```python
df2
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
      <td>-1.158573</td>
      <td>-0.941688</td>
      <td>2.568583</td>
      <td>0.494481</td>
      <td>one</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.683202</td>
      <td>0.056144</td>
      <td>0.677926</td>
      <td>-0.187010</td>
      <td>one</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
      <td>1.036779</td>
      <td>-0.146018</td>
      <td>two</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>-0.939398</td>
      <td>2.276844</td>
      <td>-0.400286</td>
      <td>0.034436</td>
      <td>three</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>1.135158</td>
      <td>0.720135</td>
      <td>-0.771679</td>
      <td>-2.690404</td>
      <td>four</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>-0.953653</td>
      <td>0.296899</td>
      <td>-1.022055</td>
      <td>2.677651</td>
      <td>three</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>1.677311</td>
      <td>-0.572894</td>
      <td>0.405523</td>
      <td>0.462660</td>
      <td>two</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.612544</td>
      <td>-1.102798</td>
      <td>-0.829374</td>
      <td>0.027003</td>
      <td>three</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>1.106210</td>
      <td>-0.385144</td>
      <td>1.194672</td>
      <td>-0.057844</td>
      <td>four</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.165680</td>
      <td>0.786776</td>
      <td>-1.079196</td>
      <td>-0.706584</td>
      <td>four</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2[df2['E'].isin(['two', 'four'])]

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
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
      <td>1.036779</td>
      <td>-0.146018</td>
      <td>two</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>1.135158</td>
      <td>0.720135</td>
      <td>-0.771679</td>
      <td>-2.690404</td>
      <td>four</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>1.677311</td>
      <td>-0.572894</td>
      <td>0.405523</td>
      <td>0.462660</td>
      <td>two</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>1.106210</td>
      <td>-0.385144</td>
      <td>1.194672</td>
      <td>-0.057844</td>
      <td>four</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.165680</td>
      <td>0.786776</td>
      <td>-1.079196</td>
      <td>-0.706584</td>
      <td>four</td>
    </tr>
  </tbody>
</table>
</div>



# Setting
Setting a new column automatically aligns the data by the indexes.


```python
s1 = pd.Series([1, 2, 3, 4, 5, 6,7,8,9,10], index=pd.date_range('20190101', periods=10))
```


```python
s1
```




    2019-01-01     1
    2019-01-02     2
    2019-01-03     3
    2019-01-04     4
    2019-01-05     5
    2019-01-06     6
    2019-01-07     7
    2019-01-08     8
    2019-01-09     9
    2019-01-10    10
    Freq: D, dtype: int64




```python
df['F'] = s1
```


```python
df
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
      <th>F</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>-1.158573</td>
      <td>-0.941688</td>
      <td>2.568583</td>
      <td>0.494481</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.683202</td>
      <td>0.056144</td>
      <td>0.677926</td>
      <td>-0.187010</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
      <td>1.036779</td>
      <td>-0.146018</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>-0.939398</td>
      <td>2.276844</td>
      <td>-0.400286</td>
      <td>0.034436</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>1.135158</td>
      <td>0.720135</td>
      <td>-0.771679</td>
      <td>-2.690404</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>-0.953653</td>
      <td>0.296899</td>
      <td>-1.022055</td>
      <td>2.677651</td>
      <td>6</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>1.677311</td>
      <td>-0.572894</td>
      <td>0.405523</td>
      <td>0.462660</td>
      <td>7</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.612544</td>
      <td>-1.102798</td>
      <td>-0.829374</td>
      <td>0.027003</td>
      <td>8</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>1.106210</td>
      <td>-0.385144</td>
      <td>1.194672</td>
      <td>-0.057844</td>
      <td>9</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.165680</td>
      <td>0.786776</td>
      <td>-1.079196</td>
      <td>-0.706584</td>
      <td>10</td>
    </tr>
  </tbody>
</table>
</div>



Setting values by label:


```python
df.loc[dates[0]] = 0
```

Setting values by position


```python
df.iloc[0,1] = 0
```

Setting by assigning with a NumPy array:


```python
df.loc[:, 'D'] = np.array([5] * len(df))
```

The result of the prior setting operations.


```python
df
```

A where operation with setting.


```python
df2 = df.copy()
```


```python
df2
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
      <th>F</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>5</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.683202</td>
      <td>0.056144</td>
      <td>0.677926</td>
      <td>5</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>0.564102</td>
      <td>1.448998</td>
      <td>1.036779</td>
      <td>5</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>-0.939398</td>
      <td>2.276844</td>
      <td>-0.400286</td>
      <td>5</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>1.135158</td>
      <td>0.720135</td>
      <td>-0.771679</td>
      <td>5</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>-0.953653</td>
      <td>0.296899</td>
      <td>-1.022055</td>
      <td>5</td>
      <td>6</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>1.677311</td>
      <td>-0.572894</td>
      <td>0.405523</td>
      <td>5</td>
      <td>7</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.612544</td>
      <td>-1.102798</td>
      <td>-0.829374</td>
      <td>5</td>
      <td>8</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>1.106210</td>
      <td>-0.385144</td>
      <td>1.194672</td>
      <td>5</td>
      <td>9</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.165680</td>
      <td>0.786776</td>
      <td>-1.079196</td>
      <td>5</td>
      <td>10</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2[df2 > 0] = -df2
```


```python
df2

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
      <th>F</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>-5</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.683202</td>
      <td>-0.056144</td>
      <td>-0.677926</td>
      <td>-5</td>
      <td>-2</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-0.564102</td>
      <td>-1.448998</td>
      <td>-1.036779</td>
      <td>-5</td>
      <td>-3</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>-0.939398</td>
      <td>-2.276844</td>
      <td>-0.400286</td>
      <td>-5</td>
      <td>-4</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>-1.135158</td>
      <td>-0.720135</td>
      <td>-0.771679</td>
      <td>-5</td>
      <td>-5</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>-0.953653</td>
      <td>-0.296899</td>
      <td>-1.022055</td>
      <td>-5</td>
      <td>-6</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>-1.677311</td>
      <td>-0.572894</td>
      <td>-0.405523</td>
      <td>-5</td>
      <td>-7</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.612544</td>
      <td>-1.102798</td>
      <td>-0.829374</td>
      <td>-5</td>
      <td>-8</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>-1.106210</td>
      <td>-0.385144</td>
      <td>-1.194672</td>
      <td>-5</td>
      <td>-9</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>-0.165680</td>
      <td>-0.786776</td>
      <td>-1.079196</td>
      <td>-5</td>
      <td>-10</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
