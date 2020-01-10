# Getting data in/out
## CSV
Writing a csv file.


```python
df.to_csv('foo.csv')
```

Reading from a csvs file.


```python
pd.read_csv('foo.csv')
```

## HDF5

Writing to a HDF5 Store.


```python
df.to_hdf('foo.h5','df')
```

Reading a HDF5 Store


```python
pd.read_hdf('foo.h5', 'df')
```

## Excel
Writing an excel file


```python
df.to_excel('foo.xlsx', sheet_name='Sheet1')
```

Reading from an excel file


```python
pd.read_excel('foo.xlsx','Sheet1',index_col=None, na_values=['NA'])
```


```python

```
