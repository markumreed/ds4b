# Plotting


```python
ts = pd.Series(np.random.randn(1000),
              index=pd.date_range('1/1/2000', periods=1000))

```


```python
ts = ts.cumsum()
```


```python
ts.plot();
```

On a DataFrame, the plot() method is a convenience to plot all of the columns with labels:




```python
df = pd.DataFrame(np.random.randn(1000, 4), index=ts.index,
                  columns=['A', 'B', 'C', 'D'])

```


```python
df = df.cumsum()
```


```python
df.plot();
```
