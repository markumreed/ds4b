# Introduction to Pandas
- Pandas is an open source library built on top of NumPy
- Allows fast analysis, cleaning and preparation of data
- High performance and productivity
- Built-in visualization capability
- Work with data from many sources


## Overview of Pandas Capabilities
- Series
- DataFrames
- Selection
- Missing Data
- Operations
- Merging, Joining, and Concatenating
- GroupBy
- Reshaping Data and Pivot Tables
- Time Series
- Data Input/Output


# Pandas
This is a basic introduction to the pandas module. 

First we start off with the customary imports. 



```python
import numpy as np
import pandas as pd

np.random.seed(42)

```

# Object Creation

## Series
- Similar to NumPy array
    - Built on top of it
- Can have axis labels


## Series Creation
- Here we will show a few ways to create series
    - Throughout the course we will be primarily dealing with DataFrames
    - DataFrames will be discussed shortly
## Series
- Series can hold a variety of object types
- Numbers, strings, etc

Create a Series by passing a list, letting pandas create a default index value. 



```python
s = pd.Series([1,2,3,np.nan, 4,5])
```


```python
s

```




    0    1.0
    1    2.0
    2    3.0
    3    NaN
    4    4.0
    5    5.0
    dtype: float64



## Series
- Key to using a series is understanding its index
    - Pandas makes use of these index names/numbers
    - Allows fast lookups of information
    - Works like a hash table or dictionary
    

## Series Examples



```python
s_1 = pd.Series([1,2,3,4],
                ['USA', 'Germany', 'China', 
                 'Japan'])
```


```python
s_1
```




    USA        1
    Germany    2
    China      3
    Japan      4
    dtype: int64



## Series Examples


```python
s_2 = pd.Series([1,2,5,6],['USA', 'Germany', 'Italy', 'China'])
```


```python
s_2
```




    USA        1
    Germany    2
    Italy      5
    China      6
    dtype: int64




```python
s_2['China'] # Indexing is type dependent
```




    6




```python
s_2.index
```




    Index(['USA', 'Germany', 'Italy', 'China'], dtype='object')



## Series Example


```python
labels = ['a', 'b', 'c'] 
s_3 = pd.Series(data=labels)
```


```python
s_3
```




    0    a
    1    b
    2    c
    dtype: object




```python
s_3[2]

```




    'c'



## Series
- Matches operation off of the index
- Creates NaN object where missing matches
- Integers convert to floats



```python
s_1
```




    USA        1
    Germany    2
    China      3
    Japan      4
    dtype: int64




```python
s_2
```




    USA        1
    Germany    2
    Italy      5
    China      6
    dtype: int64




```python
s_1 + s_2


```




    China      9.0
    Germany    4.0
    Italy      NaN
    Japan      NaN
    USA        2.0
    dtype: float64



# DataFrame Creation

Creating a DataFrame by passing a NumPy array, with a datetime index and labeled columns.


```python
dates = pd.date_range('20190101',periods=10)
```


```python
dates
```




    DatetimeIndex(['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04',
                   '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08',
                   '2019-01-09', '2019-01-10'],
                  dtype='datetime64[ns]', freq='D')




```python
df = pd.DataFrame(np.random.randn(10,4), 
                  index=dates, 
                  columns=list('ABCD'))
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
      <th>2019-01-01</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>1.523030</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.234153</td>
      <td>-0.234137</td>
      <td>1.579213</td>
      <td>0.767435</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-0.469474</td>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.465730</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>0.241962</td>
      <td>-1.913280</td>
      <td>-1.724918</td>
      <td>-0.562288</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>-1.012831</td>
      <td>0.314247</td>
      <td>-0.908024</td>
      <td>-1.412304</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>1.465649</td>
      <td>-0.225776</td>
      <td>0.067528</td>
      <td>-1.424748</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>-0.544383</td>
      <td>0.110923</td>
      <td>-1.150994</td>
      <td>0.375698</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.600639</td>
      <td>-0.291694</td>
      <td>-0.601707</td>
      <td>1.852278</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>-0.013497</td>
      <td>-1.057711</td>
      <td>0.822545</td>
      <td>-1.220844</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.208864</td>
      <td>-1.959670</td>
      <td>-1.328186</td>
      <td>0.196861</td>
    </tr>
  </tbody>
</table>
</div>



Creating a DataFrame by passing a dictionary that can be converted to a series:


```python
df2 = pd.DataFrame({'A':1.,
                    'B': pd.Timestamp('20190101'),
                    'C':pd.Series(1, index=list(range(4)),dtype='float32'),
                    'D':np.array([3] * 4, dtype='int32'),
                    'E': pd.Categorical(['test','train','test','train']),
                    'F':'foo'})
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
      <th>F</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>2019-01-01</td>
      <td>1.0</td>
      <td>3</td>
      <td>test</td>
      <td>foo</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>2019-01-01</td>
      <td>1.0</td>
      <td>3</td>
      <td>train</td>
      <td>foo</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1.0</td>
      <td>2019-01-01</td>
      <td>1.0</td>
      <td>3</td>
      <td>test</td>
      <td>foo</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1.0</td>
      <td>2019-01-01</td>
      <td>1.0</td>
      <td>3</td>
      <td>train</td>
      <td>foo</td>
    </tr>
  </tbody>
</table>
</div>



The columns of the DataFrame have different `dtypes`.


```python
df2.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 4 entries, 0 to 3
    Data columns (total 6 columns):
    A    4 non-null float64
    B    4 non-null datetime64[ns]
    C    4 non-null float32
    D    4 non-null int32
    E    4 non-null category
    F    4 non-null object
    dtypes: category(1), datetime64[ns](1), float32(1), float64(1), int32(1), object(1)
    memory usage: 260.0+ bytes



# Viewing Data

Here is how to view the top and bottom rows of the frame:


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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-01</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>1.523030</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.234153</td>
      <td>-0.234137</td>
      <td>1.579213</td>
      <td>0.767435</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-0.469474</td>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.465730</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>0.241962</td>
      <td>-1.913280</td>
      <td>-1.724918</td>
      <td>-0.562288</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>-1.012831</td>
      <td>0.314247</td>
      <td>-0.908024</td>
      <td>-1.412304</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.tail(2)
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
      <th>2019-01-09</th>
      <td>-0.013497</td>
      <td>-1.057711</td>
      <td>0.822545</td>
      <td>-1.220844</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.208864</td>
      <td>-1.959670</td>
      <td>-1.328186</td>
      <td>0.196861</td>
    </tr>
  </tbody>
</table>
</div>



Display the index, columns:


```python
df.index
```




    DatetimeIndex(['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04',
                   '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08',
                   '2019-01-09', '2019-01-10'],
                  dtype='datetime64[ns]', freq='D')




```python
df.columns
```




    Index(['A', 'B', 'C', 'D'], dtype='object')




```python
df.shape
```




    (10, 4)



We can convert our DataFrame (of floating-points) to a NumPy array.


```python
df.to_numpy() # This can be a taxing operation in not all floats
# df.values
```




    array([[ 0.49671415, -0.1382643 ,  0.64768854,  1.52302986],
           [-0.23415337, -0.23413696,  1.57921282,  0.76743473],
           [-0.46947439,  0.54256004, -0.46341769, -0.46572975],
           [ 0.24196227, -1.91328024, -1.72491783, -0.56228753],
           [-1.01283112,  0.31424733, -0.90802408, -1.4123037 ],
           [ 1.46564877, -0.2257763 ,  0.0675282 , -1.42474819],
           [-0.54438272,  0.11092259, -1.15099358,  0.37569802],
           [-0.60063869, -0.29169375, -0.60170661,  1.85227818],
           [-0.01349722, -1.05771093,  0.82254491, -1.22084365],
           [ 0.2088636 , -1.95967012, -1.32818605,  0.19686124]])




```python
df2.to_numpy() # This has multiple dtypes
```




    array([[1.0, Timestamp('2019-01-01 00:00:00'), 1.0, 3, 'test', 'foo'],
           [1.0, Timestamp('2019-01-01 00:00:00'), 1.0, 3, 'train', 'foo'],
           [1.0, Timestamp('2019-01-01 00:00:00'), 1.0, 3, 'test', 'foo'],
           [1.0, Timestamp('2019-01-01 00:00:00'), 1.0, 3, 'train', 'foo']],
          dtype=object)



`describe()` shows a quick statistic summary of your data:


```python
df.describe()
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
      <th>count</th>
      <td>10.000000</td>
      <td>10.000000</td>
      <td>10.000000</td>
      <td>10.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>-0.046179</td>
      <td>-0.485280</td>
      <td>-0.306027</td>
      <td>-0.037061</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.701907</td>
      <td>0.874335</td>
      <td>1.060584</td>
      <td>1.181041</td>
    </tr>
    <tr>
      <th>min</th>
      <td>-1.012831</td>
      <td>-1.959670</td>
      <td>-1.724918</td>
      <td>-1.424748</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>-0.525656</td>
      <td>-0.866207</td>
      <td>-1.090251</td>
      <td>-1.056205</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>-0.123825</td>
      <td>-0.229957</td>
      <td>-0.532562</td>
      <td>-0.134434</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>0.233688</td>
      <td>0.048626</td>
      <td>0.502648</td>
      <td>0.669501</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1.465649</td>
      <td>0.542560</td>
      <td>1.579213</td>
      <td>1.852278</td>
    </tr>
  </tbody>
</table>
</div>



Transposing your data:


```python
df.T
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
      <th>2019-01-01</th>
      <th>2019-01-02</th>
      <th>2019-01-03</th>
      <th>2019-01-04</th>
      <th>2019-01-05</th>
      <th>2019-01-06</th>
      <th>2019-01-07</th>
      <th>2019-01-08</th>
      <th>2019-01-09</th>
      <th>2019-01-10</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>0.496714</td>
      <td>-0.234153</td>
      <td>-0.469474</td>
      <td>0.241962</td>
      <td>-1.012831</td>
      <td>1.465649</td>
      <td>-0.544383</td>
      <td>-0.600639</td>
      <td>-0.013497</td>
      <td>0.208864</td>
    </tr>
    <tr>
      <th>B</th>
      <td>-0.138264</td>
      <td>-0.234137</td>
      <td>0.542560</td>
      <td>-1.913280</td>
      <td>0.314247</td>
      <td>-0.225776</td>
      <td>0.110923</td>
      <td>-0.291694</td>
      <td>-1.057711</td>
      <td>-1.959670</td>
    </tr>
    <tr>
      <th>C</th>
      <td>0.647689</td>
      <td>1.579213</td>
      <td>-0.463418</td>
      <td>-1.724918</td>
      <td>-0.908024</td>
      <td>0.067528</td>
      <td>-1.150994</td>
      <td>-0.601707</td>
      <td>0.822545</td>
      <td>-1.328186</td>
    </tr>
    <tr>
      <th>D</th>
      <td>1.523030</td>
      <td>0.767435</td>
      <td>-0.465730</td>
      <td>-0.562288</td>
      <td>-1.412304</td>
      <td>-1.424748</td>
      <td>0.375698</td>
      <td>1.852278</td>
      <td>-1.220844</td>
      <td>0.196861</td>
    </tr>
  </tbody>
</table>
</div>



Sorting by an axis:


```python
df.sort_index(axis=0, ascending=False) # axis = 1 Columns
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
      <th>2019-01-10</th>
      <td>0.208864</td>
      <td>-1.959670</td>
      <td>-1.328186</td>
      <td>0.196861</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>-0.013497</td>
      <td>-1.057711</td>
      <td>0.822545</td>
      <td>-1.220844</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.600639</td>
      <td>-0.291694</td>
      <td>-0.601707</td>
      <td>1.852278</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>-0.544383</td>
      <td>0.110923</td>
      <td>-1.150994</td>
      <td>0.375698</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>1.465649</td>
      <td>-0.225776</td>
      <td>0.067528</td>
      <td>-1.424748</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>-1.012831</td>
      <td>0.314247</td>
      <td>-0.908024</td>
      <td>-1.412304</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>0.241962</td>
      <td>-1.913280</td>
      <td>-1.724918</td>
      <td>-0.562288</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-0.469474</td>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.465730</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.234153</td>
      <td>-0.234137</td>
      <td>1.579213</td>
      <td>0.767435</td>
    </tr>
    <tr>
      <th>2019-01-01</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>1.523030</td>
    </tr>
  </tbody>
</table>
</div>



Sorting by values:


```python
df.sort_values(by='B', ascending=False)
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
      <td>-0.469474</td>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.465730</td>
    </tr>
    <tr>
      <th>2019-01-05</th>
      <td>-1.012831</td>
      <td>0.314247</td>
      <td>-0.908024</td>
      <td>-1.412304</td>
    </tr>
    <tr>
      <th>2019-01-07</th>
      <td>-0.544383</td>
      <td>0.110923</td>
      <td>-1.150994</td>
      <td>0.375698</td>
    </tr>
    <tr>
      <th>2019-01-01</th>
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>1.523030</td>
    </tr>
    <tr>
      <th>2019-01-06</th>
      <td>1.465649</td>
      <td>-0.225776</td>
      <td>0.067528</td>
      <td>-1.424748</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.234153</td>
      <td>-0.234137</td>
      <td>1.579213</td>
      <td>0.767435</td>
    </tr>
    <tr>
      <th>2019-01-08</th>
      <td>-0.600639</td>
      <td>-0.291694</td>
      <td>-0.601707</td>
      <td>1.852278</td>
    </tr>
    <tr>
      <th>2019-01-09</th>
      <td>-0.013497</td>
      <td>-1.057711</td>
      <td>0.822545</td>
      <td>-1.220844</td>
    </tr>
    <tr>
      <th>2019-01-04</th>
      <td>0.241962</td>
      <td>-1.913280</td>
      <td>-1.724918</td>
      <td>-0.562288</td>
    </tr>
    <tr>
      <th>2019-01-10</th>
      <td>0.208864</td>
      <td>-1.959670</td>
      <td>-1.328186</td>
      <td>0.196861</td>
    </tr>
  </tbody>
</table>
</div>




# Selection
Selecting a single columns yields a `Series`


```python
df['A']
```




    2019-01-01    0.496714
    2019-01-02   -0.234153
    2019-01-03   -0.469474
    2019-01-04    0.241962
    2019-01-05   -1.012831
    2019-01-06    1.465649
    2019-01-07   -0.544383
    2019-01-08   -0.600639
    2019-01-09   -0.013497
    2019-01-10    0.208864
    Freq: D, Name: A, dtype: float64



Selecting with `[]` slices the rows


```python
df[0:3]
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
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>1.523030</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.234153</td>
      <td>-0.234137</td>
      <td>1.579213</td>
      <td>0.767435</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-0.469474</td>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.465730</td>
    </tr>
  </tbody>
</table>
</div>




```python
df['20190101':'20190103']


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
      <td>0.496714</td>
      <td>-0.138264</td>
      <td>0.647689</td>
      <td>1.523030</td>
    </tr>
    <tr>
      <th>2019-01-02</th>
      <td>-0.234153</td>
      <td>-0.234137</td>
      <td>1.579213</td>
      <td>0.767435</td>
    </tr>
    <tr>
      <th>2019-01-03</th>
      <td>-0.469474</td>
      <td>0.542560</td>
      <td>-0.463418</td>
      <td>-0.465730</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
