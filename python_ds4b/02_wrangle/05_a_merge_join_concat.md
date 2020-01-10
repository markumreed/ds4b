# Merge
## Concat
pandas provides various facilities for easily combining together Series and DataFrame objects with various kinds of set logic for the indexes and relational algebra functionality in the case of join / merge-type operations.

Concatenating pandas objects together with `concat()`:


```python
import pandas as pd
import numpy as np
np.random.seed()
df = pd.DataFrame(np.random.randn(10, 4))
```


```python
df # DataFrame
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.493947</td>
      <td>1.625480</td>
      <td>0.244771</td>
      <td>-0.185388</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.198916</td>
      <td>-1.376590</td>
      <td>-1.215013</td>
      <td>-1.194330</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.119116</td>
      <td>0.843964</td>
      <td>-0.320494</td>
      <td>-2.380751</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.024455</td>
      <td>1.921114</td>
      <td>-0.142516</td>
      <td>0.262443</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.871334</td>
      <td>-0.456046</td>
      <td>-0.653551</td>
      <td>1.771860</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1.058511</td>
      <td>-2.091128</td>
      <td>1.171792</td>
      <td>1.563637</td>
    </tr>
    <tr>
      <th>6</th>
      <td>-0.192952</td>
      <td>1.377423</td>
      <td>0.552583</td>
      <td>0.288304</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1.480328</td>
      <td>-0.757365</td>
      <td>-0.272379</td>
      <td>-0.362830</td>
    </tr>
    <tr>
      <th>8</th>
      <td>-0.033634</td>
      <td>-0.371534</td>
      <td>1.738937</td>
      <td>-1.010350</td>
    </tr>
    <tr>
      <th>9</th>
      <td>-0.206187</td>
      <td>-1.458660</td>
      <td>0.538586</td>
      <td>-1.532622</td>
    </tr>
  </tbody>
</table>
</div>




```python
df[:3]
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.493947</td>
      <td>1.625480</td>
      <td>0.244771</td>
      <td>-0.185388</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.198916</td>
      <td>-1.376590</td>
      <td>-1.215013</td>
      <td>-1.194330</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.119116</td>
      <td>0.843964</td>
      <td>-0.320494</td>
      <td>-2.380751</td>
    </tr>
  </tbody>
</table>
</div>




```python
pieces = [df[:3], df[3:7], df[7:]] # Break it into pieces
```


```python
pieces
```




    [          0         1         2         3
     0 -0.493947  1.625480  0.244771 -0.185388
     1  0.198916 -1.376590 -1.215013 -1.194330
     2 -0.119116  0.843964 -0.320494 -2.380751,
               0         1         2         3
     3  0.024455  1.921114 -0.142516  0.262443
     4 -0.871334 -0.456046 -0.653551  1.771860
     5  1.058511 -2.091128  1.171792  1.563637
     6 -0.192952  1.377423  0.552583  0.288304,
               0         1         2         3
     7  1.480328 -0.757365 -0.272379 -0.362830
     8 -0.033634 -0.371534  1.738937 -1.010350
     9 -0.206187 -1.458660  0.538586 -1.532622]




```python
pd.concat(pieces)

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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.493947</td>
      <td>1.625480</td>
      <td>0.244771</td>
      <td>-0.185388</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.198916</td>
      <td>-1.376590</td>
      <td>-1.215013</td>
      <td>-1.194330</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.119116</td>
      <td>0.843964</td>
      <td>-0.320494</td>
      <td>-2.380751</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.024455</td>
      <td>1.921114</td>
      <td>-0.142516</td>
      <td>0.262443</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.871334</td>
      <td>-0.456046</td>
      <td>-0.653551</td>
      <td>1.771860</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1.058511</td>
      <td>-2.091128</td>
      <td>1.171792</td>
      <td>1.563637</td>
    </tr>
    <tr>
      <th>6</th>
      <td>-0.192952</td>
      <td>1.377423</td>
      <td>0.552583</td>
      <td>0.288304</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1.480328</td>
      <td>-0.757365</td>
      <td>-0.272379</td>
      <td>-0.362830</td>
    </tr>
    <tr>
      <th>8</th>
      <td>-0.033634</td>
      <td>-0.371534</td>
      <td>1.738937</td>
      <td>-1.010350</td>
    </tr>
    <tr>
      <th>9</th>
      <td>-0.206187</td>
      <td>-1.458660</td>
      <td>0.538586</td>
      <td>-1.532622</td>
    </tr>
  </tbody>
</table>
</div>



# Join
SQL style merges.


```python
left = pd.DataFrame({'key': ['foo', 'foo'], 'lval': [1, 2]})
right = pd.DataFrame({'key': ['foo', 'foo'], 'rval': [4, 5]})
```


```python
left
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
      <th>key</th>
      <th>lval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>foo</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>




```python
right
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
      <th>key</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>foo</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(left, right, on='key')
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
      <th>key</th>
      <th>lval</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>foo</td>
      <td>1</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>foo</td>
      <td>2</td>
      <td>4</td>
    </tr>
    <tr>
      <th>3</th>
      <td>foo</td>
      <td>2</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>



Another Example


```python
left = pd.DataFrame({'key': ['foo', 'bar'], 'lval': [1, 2]})
right = pd.DataFrame({'key': ['foo', 'bar'], 'rval': [4, 5]})
```


```python
left
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
      <th>key</th>
      <th>lval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bar</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>




```python
right
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
      <th>key</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bar</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(left, right, on='key')

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
      <th>key</th>
      <th>lval</th>
      <th>rval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>1</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bar</td>
      <td>2</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>



# Append
Append rows to a dataframe.


```python
df = pd.DataFrame(np.random.randn(8, 4), columns=['A', 'B', 'C', 'D'])
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.784375</td>
      <td>0.511805</td>
      <td>0.323780</td>
      <td>-0.065874</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.777933</td>
      <td>0.149912</td>
      <td>-1.727348</td>
      <td>0.197836</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2.382810</td>
      <td>0.501593</td>
      <td>1.274527</td>
      <td>-0.456674</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.003459</td>
      <td>0.793957</td>
      <td>1.188773</td>
      <td>0.999236</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.874190</td>
      <td>0.413551</td>
      <td>0.020734</td>
      <td>-0.300775</td>
    </tr>
    <tr>
      <th>5</th>
      <td>-1.520646</td>
      <td>1.291041</td>
      <td>0.561644</td>
      <td>-0.705396</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.487781</td>
      <td>0.191630</td>
      <td>0.788804</td>
      <td>1.912556</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.612815</td>
      <td>0.366643</td>
      <td>-1.120432</td>
      <td>-1.543861</td>
    </tr>
  </tbody>
</table>
</div>




```python
s = df.iloc[3]
```


```python
s
```




    A    0.003459
    B    0.793957
    C    1.188773
    D    0.999236
    Name: 3, dtype: float64




```python
df.append(s, ignore_index=True)
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
      <th>0</th>
      <td>-0.784375</td>
      <td>0.511805</td>
      <td>0.323780</td>
      <td>-0.065874</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.777933</td>
      <td>0.149912</td>
      <td>-1.727348</td>
      <td>0.197836</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2.382810</td>
      <td>0.501593</td>
      <td>1.274527</td>
      <td>-0.456674</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.003459</td>
      <td>0.793957</td>
      <td>1.188773</td>
      <td>0.999236</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.874190</td>
      <td>0.413551</td>
      <td>0.020734</td>
      <td>-0.300775</td>
    </tr>
    <tr>
      <th>5</th>
      <td>-1.520646</td>
      <td>1.291041</td>
      <td>0.561644</td>
      <td>-0.705396</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.487781</td>
      <td>0.191630</td>
      <td>0.788804</td>
      <td>1.912556</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.612815</td>
      <td>0.366643</td>
      <td>-1.120432</td>
      <td>-1.543861</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.003459</td>
      <td>0.793957</td>
      <td>1.188773</td>
      <td>0.999236</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
