# Time Series
pandas has simple, powerful, and efficient functionality for performing resampling operations during frequency conversion (e.g., converting secondly data into 5-minutely data). This is extremely common in, but not limited to, financial applications.



```python
rng = pd.date_range('1/1/2012', periods=100, freq='S')
```


```python
ts = pd.Series(np.random.randint(0, 500, len(rng)), index=rng)
```


```python
ts.resample('5Min').sum()
```

Time zone representation:


```python
rng = pd.date_range('3/6/2012 00:00', periods=5, freq='D')
```


```python
ts = pd.Series(np.random.randn(len(rng)), rng)
```


```python
ts
```


```python
ts_utc = ts.tz_localize('UTC')
```


```python
ts_utc
```

Converting to another time zone:


```python
ts_utc.tz_convert('US/Eastern')
```

Converting between time span representations:


```python
rng = pd.date_range('1/1/2012', periods=5, freq='M')
```


```python
ts = pd.Series(np.random.randn(len(rng)), index=rng)
```


```python
ts
```


```python
ps = ts.to_period()
```


```python
ps
```


```python
ps.to_timestamp()

```

Converting between period and timestamp enables some convenient arithmetic functions to be used. In the following example, we convert a quarterly frequency with year ending in November to 9am of the end of the month following the quarter end:




```python
prng = pd.period_range('1990Q1', '2000Q4', freq='Q-NOV')

```


```python
ts = pd.Series(np.random.randn(len(prng)), prng)

```


```python
ts.index = (prng.asfreq('M', 'e') + 1).asfreq('H', 's') + 9

```


```python
ts.head()
```
