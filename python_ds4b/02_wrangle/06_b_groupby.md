# Groupby
- `.groupby` method allow syou to group rows of data together and call aggregate functions


```python
import numpy as np
import pandas as pd
```


```python
data = {'school': ['HSU', 'HSU','HSU', 'OBU','OBU',
                   'SIU','SIU', 'SEU', 'SEU'],
       'professor': ['Bob','Jeff','Angela','Susan',
                     'Albert','Zelda','Alexa',
                     'Heather','Rebecca'],
       'publication': [10,2,30,25,0,80,4,30,15]}
df = pd.DataFrame(data)
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
      <th>school</th>
      <th>professor</th>
      <th>publication</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>HSU</td>
      <td>Bob</td>
      <td>10</td>
    </tr>
    <tr>
      <th>1</th>
      <td>HSU</td>
      <td>Jeff</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>HSU</td>
      <td>Angela</td>
      <td>30</td>
    </tr>
    <tr>
      <th>3</th>
      <td>OBU</td>
      <td>Susan</td>
      <td>25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>OBU</td>
      <td>Albert</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>SIU</td>
      <td>Zelda</td>
      <td>80</td>
    </tr>
    <tr>
      <th>6</th>
      <td>SIU</td>
      <td>Alexa</td>
      <td>4</td>
    </tr>
    <tr>
      <th>7</th>
      <td>SEU</td>
      <td>Heather</td>
      <td>30</td>
    </tr>
    <tr>
      <th>8</th>
      <td>SEU</td>
      <td>Rebecca</td>
      <td>15</td>
    </tr>
  </tbody>
</table>
</div>



## groupby()
- use the .groupby() method to group rows together based off of a column name
- Create a group based off of school 


```python
df.groupby('school') #creates a DataFrameGroupBy object
```




    <pandas.core.groupby.groupby.DataFrameGroupBy object at 0x119d4db00>




```python
by_school = df.groupby('school')
```

## Groupby and Aggregation Methods
- Use the aggregation methods on the grouped object


```python
by_school.mean()
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
      <th>publication</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>14.0</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>12.5</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>22.5</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>42.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.groupby('school').mean()
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
      <th>publication</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>14.0</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>12.5</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>22.5</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>42.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
by_school.std() # standard deviation
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
      <th>publication</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>14.422205</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>17.677670</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>10.606602</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>53.740115</td>
    </tr>
  </tbody>
</table>
</div>




```python
by_school.min()
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
      <th>professor</th>
      <th>publication</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>Angela</td>
      <td>2</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>Albert</td>
      <td>0</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>Heather</td>
      <td>15</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>Alexa</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>




```python
by_school.max()
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
      <th>professor</th>
      <th>publication</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>Jeff</td>
      <td>30</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>Susan</td>
      <td>25</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>Rebecca</td>
      <td>30</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>Zelda</td>
      <td>80</td>
    </tr>
  </tbody>
</table>
</div>




```python
by_school.count()
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
      <th>professor</th>
      <th>publication</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>2</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>



## Groupby + describe method


```python
by_school.describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="8" halign="left">publication</th>
    </tr>
    <tr>
      <th></th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>3.0</td>
      <td>14.0</td>
      <td>14.422205</td>
      <td>2.0</td>
      <td>6.00</td>
      <td>10.0</td>
      <td>20.00</td>
      <td>30.0</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>2.0</td>
      <td>12.5</td>
      <td>17.677670</td>
      <td>0.0</td>
      <td>6.25</td>
      <td>12.5</td>
      <td>18.75</td>
      <td>25.0</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>2.0</td>
      <td>22.5</td>
      <td>10.606602</td>
      <td>15.0</td>
      <td>18.75</td>
      <td>22.5</td>
      <td>26.25</td>
      <td>30.0</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>2.0</td>
      <td>42.0</td>
      <td>53.740115</td>
      <td>4.0</td>
      <td>23.00</td>
      <td>42.0</td>
      <td>61.00</td>
      <td>80.0</td>
    </tr>
  </tbody>
</table>
</div>



## Groupby + describe method


```python
type(by_school.describe().transpose())
```




    pandas.core.frame.DataFrame



## Groupby + describe method (multiple numeric values)


```python
data = {'school': ['HSU', 'HSU','HSU', 'OBU','OBU','SIU','SIU', 'SEU', 'SEU'],
       'professor': ['Bob','Jeff','Angela','Susan','Albert','Zelda','Alexa','Heather','Rebecca'],
       'publication': [10,2,30,25,0,80,4,30,15],
       'years':[2,8,14,3,4,25,7,2,5]}
df = pd.DataFrame(data)
```


```python
df.groupby('school').describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="8" halign="left">publication</th>
      <th colspan="8" halign="left">years</th>
    </tr>
    <tr>
      <th></th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HSU</th>
      <td>3.0</td>
      <td>14.0</td>
      <td>14.422205</td>
      <td>2.0</td>
      <td>6.00</td>
      <td>10.0</td>
      <td>20.00</td>
      <td>30.0</td>
      <td>3.0</td>
      <td>8.0</td>
      <td>6.000000</td>
      <td>2.0</td>
      <td>5.00</td>
      <td>8.0</td>
      <td>11.00</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>OBU</th>
      <td>2.0</td>
      <td>12.5</td>
      <td>17.677670</td>
      <td>0.0</td>
      <td>6.25</td>
      <td>12.5</td>
      <td>18.75</td>
      <td>25.0</td>
      <td>2.0</td>
      <td>3.5</td>
      <td>0.707107</td>
      <td>3.0</td>
      <td>3.25</td>
      <td>3.5</td>
      <td>3.75</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>SEU</th>
      <td>2.0</td>
      <td>22.5</td>
      <td>10.606602</td>
      <td>15.0</td>
      <td>18.75</td>
      <td>22.5</td>
      <td>26.25</td>
      <td>30.0</td>
      <td>2.0</td>
      <td>3.5</td>
      <td>2.121320</td>
      <td>2.0</td>
      <td>2.75</td>
      <td>3.5</td>
      <td>4.25</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>SIU</th>
      <td>2.0</td>
      <td>42.0</td>
      <td>53.740115</td>
      <td>4.0</td>
      <td>23.00</td>
      <td>42.0</td>
      <td>61.00</td>
      <td>80.0</td>
      <td>2.0</td>
      <td>16.0</td>
      <td>12.727922</td>
      <td>7.0</td>
      <td>11.50</td>
      <td>16.0</td>
      <td>20.50</td>
      <td>25.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.groupby('school').describe().transpose()
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
      <th>school</th>
      <th>HSU</th>
      <th>OBU</th>
      <th>SEU</th>
      <th>SIU</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="8" valign="top">publication</th>
      <th>count</th>
      <td>3.000000</td>
      <td>2.000000</td>
      <td>2.000000</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>14.000000</td>
      <td>12.500000</td>
      <td>22.500000</td>
      <td>42.000000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>14.422205</td>
      <td>17.677670</td>
      <td>10.606602</td>
      <td>53.740115</td>
    </tr>
    <tr>
      <th>min</th>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>15.000000</td>
      <td>4.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>6.000000</td>
      <td>6.250000</td>
      <td>18.750000</td>
      <td>23.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>10.000000</td>
      <td>12.500000</td>
      <td>22.500000</td>
      <td>42.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>20.000000</td>
      <td>18.750000</td>
      <td>26.250000</td>
      <td>61.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>30.000000</td>
      <td>25.000000</td>
      <td>30.000000</td>
      <td>80.000000</td>
    </tr>
    <tr>
      <th rowspan="8" valign="top">years</th>
      <th>count</th>
      <td>3.000000</td>
      <td>2.000000</td>
      <td>2.000000</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>8.000000</td>
      <td>3.500000</td>
      <td>3.500000</td>
      <td>16.000000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>6.000000</td>
      <td>0.707107</td>
      <td>2.121320</td>
      <td>12.727922</td>
    </tr>
    <tr>
      <th>min</th>
      <td>2.000000</td>
      <td>3.000000</td>
      <td>2.000000</td>
      <td>7.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>5.000000</td>
      <td>3.250000</td>
      <td>2.750000</td>
      <td>11.500000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>8.000000</td>
      <td>3.500000</td>
      <td>3.500000</td>
      <td>16.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>11.000000</td>
      <td>3.750000</td>
      <td>4.250000</td>
      <td>20.500000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>14.000000</td>
      <td>4.000000</td>
      <td>5.000000</td>
      <td>25.000000</td>
    </tr>
  </tbody>
</table>
</div>



# DONE
