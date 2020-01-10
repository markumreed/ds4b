# Operations
## Stats
Operations in general *exclude* missing data.

Performing a descriptive statistic:


```python
import pandas as pd
import numpy as np
dates = pd.date_range('20190101',periods=10)
df = pd.DataFrame(np.random.randn(10,4), 
                  index=dates, 
                  columns=list('ABCD'))

df = df.reindex(index=dates[0:4], columns=list(df.columns) + ['E'])
df.loc[dates[0]:dates[1], 'E'] = 1
```


```python
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
      <td>-0.914745</td>
      <td>-1.169413</td>
      <td>0.445567</td>
      <td>-1.612202</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>1.382350</td>
      <td>1.083761</td>
      <td>-1.132513</td>
      <td>-0.282442</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-1.022387</td>
      <td>2.451375</td>
      <td>1.505668</td>
      <td>0.344774</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>0.907028</td>
      <td>-0.532535</td>
      <td>-0.730059</td>
      <td>-0.608755</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.mean()
```




    A    0.088062
    B    0.458297
    C    0.022166
    D   -0.539656
    E    1.000000
    dtype: float64



Same operation on the other axis:


```python
df.mean(axis=1)
```




    2019-01-01   -0.450158
    2019-01-02    0.410231
    2019-01-03    0.819858
    2019-01-04   -0.241081
    Freq: D, dtype: float64



# Apply
Applying functions to the data:


```python
df.apply(np.cumsum)
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
      <td>-0.914745</td>
      <td>-1.169413</td>
      <td>0.445567</td>
      <td>-1.612202</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>0.467606</td>
      <td>-0.085651</td>
      <td>-0.686946</td>
      <td>-1.894644</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-0.554781</td>
      <td>2.365724</td>
      <td>0.818722</td>
      <td>-1.549870</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>0.352247</td>
      <td>1.833188</td>
      <td>0.088663</td>
      <td>-2.158625</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.apply(lambda x: x.max() - x.min())
```




    A    2.404737
    B    3.620788
    C    2.638181
    D    1.956975
    E    0.000000
    dtype: float64



# Histogramming


```python
s = pd.Series(np.random.randint(0, 7, size=10))
```


```python
s
```




    0    4
    1    0
    2    5
    3    5
    4    3
    5    2
    6    2
    7    5
    8    4
    9    2
    dtype: int64




```python
s.value_counts()
```




    5    3
    2    3
    4    2
    3    1
    0    1
    dtype: int64



# String Methods
Series is equipped with a set of string processing methods in the str attribute that make it easy to operate on each element of the array, as in the code snippet below. Note that pattern-matching in str generally uses regular expressions by default.


```python
s = pd.Series(['A', 'B', 'C', 'Aaba', 'Baca', np.nan, 'CABA', 'dog', 'cat'])
```


```python
s
```




    0       A
    1       B
    2       C
    3    Aaba
    4    Baca
    5     NaN
    6    CABA
    7     dog
    8     cat
    dtype: object




```python
s.str.title()

```




    0       A
    1       B
    2       C
    3    Aaba
    4    Baca
    5     NaN
    6    Caba
    7     Dog
    8     Cat
    dtype: object




```python

```
