## Dealing with Missing Data


```python
import numpy as np
import pandas as pd
np.random.seed(42)
```


```python
df = pd.DataFrame(np.random.randn(5,3), 
                  index=['a','c','d','f','g'],
                  columns=['one','two','three'])
```


```python
df['four'] = 'blah'
```


```python
df['five'] = df['one'] > 0
```

## Creating Missing Data


```python
df.iloc[2,2] = np.nan
df.iloc[3,4] = np.nan # Notice what happens here!
df.iloc[3,3] = np.nan
df.iloc[4,4] = np.nan
df.iloc[1,1] = np.nan
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
      <th>one</th>
      <th>two</th>
      <th>three</th>
      <th>four</th>
      <th>five</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>blah</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>c</th>
      <td>1.523030</td>
      <td>NaN</td>
      <td>-0.234137</td>
      <td>blah</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>d</th>
      <td>1.579213</td>
      <td>0.767435</td>
      <td>NaN</td>
      <td>blah</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>f</th>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.465730</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>g</th>
      <td>0.241962</td>
      <td>-1.913280</td>
      <td>-1.724918</td>
      <td>blah</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



## Drop Missing Data


```python
df.dropna() # Keeps only complete rows
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
      <th>one</th>
      <th>two</th>
      <th>three</th>
      <th>four</th>
      <th>five</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>blah</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.dropna(axis=1) # Keeps only complete columns
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
      <th>one</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>-0.719844</td>
    </tr>
    <tr>
      <th>c</th>
      <td>0.343618</td>
    </tr>
    <tr>
      <th>d</th>
      <td>-0.385082</td>
    </tr>
    <tr>
      <th>f</th>
      <td>1.031000</td>
    </tr>
    <tr>
      <th>g</th>
      <td>-0.309212</td>
    </tr>
  </tbody>
</table>
</div>



## Keep rows at Threshold


```python
df.dropna(thresh=4) # Keeps rows that have AT LEAST 4 non-na values
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
      <th>one</th>
      <th>two</th>
      <th>three</th>
      <th>four</th>
      <th>five</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>blah</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>c</th>
      <td>1.523030</td>
      <td>NaN</td>
      <td>-0.234137</td>
      <td>blah</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>d</th>
      <td>1.579213</td>
      <td>0.767435</td>
      <td>NaN</td>
      <td>blah</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>g</th>
      <td>0.241962</td>
      <td>-1.913280</td>
      <td>-1.724918</td>
      <td>blah</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



## Fill Missing Values


```python
df.fillna(value="PINK FLUFFY UNICORN") # Fill with whatever you want
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
      <th>one</th>
      <th>two</th>
      <th>three</th>
      <th>four</th>
      <th>five</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>blah</td>
      <td>1</td>
    </tr>
    <tr>
      <th>c</th>
      <td>1.523030</td>
      <td>PINK FLUFFY UNICORN</td>
      <td>-0.234137</td>
      <td>blah</td>
      <td>1</td>
    </tr>
    <tr>
      <th>d</th>
      <td>1.579213</td>
      <td>0.767435</td>
      <td>PINK FLUFFY UNICORN</td>
      <td>blah</td>
      <td>1</td>
    </tr>
    <tr>
      <th>f</th>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.46573</td>
      <td>PINK FLUFFY UNICORN</td>
      <td>PINK FLUFFY UNICORN</td>
    </tr>
    <tr>
      <th>g</th>
      <td>0.241962</td>
      <td>-1.91328</td>
      <td>-1.72492</td>
      <td>blah</td>
      <td>PINK FLUFFY UNICORN</td>
    </tr>
  </tbody>
</table>
</div>




```python
df['two'].fillna(value=df['two'].mean())
```




    a   -0.460639
    c    0.031246
    d   -0.676922
    f    0.931280
    g    0.331263
    Name: two, dtype: float64



# DONE!
