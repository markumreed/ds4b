## Preamble



```python
!git clone https://github.com/thomasnield/oreilly_getting_started_with_sql.git
%load_ext sql
%sql sqlite:///oreilly_getting_started_with_sql/extra_practice_database.db
```

    fatal: destination path 'oreilly_getting_started_with_sql' already exists and is not an empty directory.
    The sql extension is already loaded. To reload it, use:
      %reload_ext sql





    'Connected: @oreilly_getting_started_with_sql/extra_practice_database.db'



# Midterm Practice

Get to know the three Tables in this database:

1. ARTIST
1. ALBUM
1. TRACK
1. Playlist
1. PlaylistTrack


```python
%%sql

SELECT name FROM track

LIMIT(3);
```

     * sqlite:///oreilly_getting_started_with_sql/extra_practice_database.db
    Done.





<table>
    <tr>
        <th>Name</th>
    </tr>
    <tr>
        <td>For Those About To Rock (We Salute You)</td>
    </tr>
    <tr>
        <td>Balls to the Wall</td>
    </tr>
    <tr>
        <td>Fast As a Shark</td>
    </tr>
</table>



## Question 1:

Create a table that contains the artists name, album title and tracks.

Use the `GROUP_CONCAT` function to concat the Track names.

Group by artist name and album title.


```python
 %%sql

SELECT 
ARTIST.NAME AS ARTIST_NAME,
TITLE AS ALBUM_TITLE,
GROUP_CONCAT(TRACK.Name,', ') AS TRACKS

FROM ARTIST INNER JOIN ALBUM
ON ARTIST.ArtistId = ALBUM.ArtistId

INNER JOIN TRACK
ON TRACK.AlbumId = Album.AlbumId

GROUP BY 1,2
LIMIT(5);
```

     * sqlite:///oreilly_getting_started_with_sql/extra_practice_database.db
    Done.





<table>
    <tr>
        <th>ARTIST_NAME</th>
        <th>ALBUM_TITLE</th>
        <th>TRACKS</th>
    </tr>
    <tr>
        <td>AC/DC</td>
        <td>For Those About To Rock We Salute You</td>
        <td>For Those About To Rock (We Salute You), Put The Finger On You, Let&#x27;s Get It Up, Inject The Venom, Snowballed, Evil Walks, C.O.D., Breaking The Rules, Night Of The Long Knives, Spellbound</td>
    </tr>
    <tr>
        <td>AC/DC</td>
        <td>Let There Be Rock</td>
        <td>Go Down, Dog Eat Dog, Let There Be Rock, Bad Boy Boogie, Problem Child, Overdose, Hell Ain&#x27;t A Bad Place To Be, Whole Lotta Rosie</td>
    </tr>
    <tr>
        <td>Aaron Copland &amp; London Symphony Orchestra</td>
        <td>A Copland Celebration, Vol. I</td>
        <td>Fanfare for the Common Man</td>
    </tr>
    <tr>
        <td>Aaron Goldberg</td>
        <td>Worlds</td>
        <td>OAM&#x27;s Blues</td>
    </tr>
    <tr>
        <td>Academy of St. Martin in the Fields &amp; Sir Neville Marriner</td>
        <td>The World of Classical Favourites</td>
        <td>Solomon HWV 67: The Arrival of the Queen of Sheba, Fantasia On Greensleeves</td>
    </tr>
</table>



## Question 2:

Grunge Playlists:

Join Playlist and PlaylistTrack, Track and Album, Album and Artist.

Where the playlist is grunge:

(HINT: Grunge = 16)


```python
%%sql

SELECT 
Playlist.Name as PLAYLIST_NAME,
Artist.Name as ARTIST_NAME,
Track.Name as TRACK_NAME,
Album.Title as ALBUM_TITLE

FROM Playlist INNER JOIN PlaylistTrack
ON Playlist.PlaylistId = PlaylistTrack.PlaylistId

INNER JOIN Track
ON PlaylistTrack.TrackId = Track.TrackId

INNER JOIN Album
ON Track.AlbumId = Album.AlbumId

INNER JOIN Artist
ON Album.ArtistId = Artist.ArtistId

WHERE Playlist.PlaylistId = 16
```

     * sqlite:///oreilly_getting_started_with_sql/extra_practice_database.db
    Done.





<table>
    <tr>
        <th>PLAYLIST_NAME</th>
        <th>ARTIST_NAME</th>
        <th>TRACK_NAME</th>
        <th>ALBUM_TITLE</th>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Alice In Chains</td>
        <td>Man In The Box</td>
        <td>Facelift</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Nirvana</td>
        <td>Smells Like Teen Spirit</td>
        <td>Nevermind</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Nirvana</td>
        <td>In Bloom</td>
        <td>Nevermind</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Nirvana</td>
        <td>Come As You Are</td>
        <td>Nevermind</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Nirvana</td>
        <td>Lithium</td>
        <td>Nevermind</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Nirvana</td>
        <td>Drain You</td>
        <td>Nevermind</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Nirvana</td>
        <td>On A Plain</td>
        <td>Nevermind</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Pearl Jam</td>
        <td>Evenflow</td>
        <td>Ten</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Pearl Jam</td>
        <td>Alive</td>
        <td>Ten</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Pearl Jam</td>
        <td>Jeremy</td>
        <td>Ten</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Pearl Jam</td>
        <td>Daughter</td>
        <td>Vs.</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Soundgarden</td>
        <td>Outshined</td>
        <td>A-Sides</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Soundgarden</td>
        <td>Black Hole Sun</td>
        <td>A-Sides</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Stone Temple Pilots</td>
        <td>Plush</td>
        <td>Core</td>
    </tr>
    <tr>
        <td>Grunge</td>
        <td>Temple of the Dog</td>
        <td>Hunger Strike</td>
        <td>Temple of the Dog</td>
    </tr>
</table>



## Question Prep
Get to know the following tables:

1. Invoice
1. Customer


```python
%%sql

SELECT * FROM Invoice
LIMIT(3);
```

     * sqlite:///oreilly_getting_started_with_sql/extra_practice_database.db
    Done.





<table>
    <tr>
        <th>InvoiceId</th>
        <th>CustomerId</th>
        <th>InvoiceDate</th>
        <th>BillingAddress</th>
        <th>BillingCity</th>
        <th>BillingState</th>
        <th>BillingCountry</th>
        <th>BillingPostalCode</th>
        <th>Total</th>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>2009-01-01 00:00:00</td>
        <td>Theodor-Heuss-Straße 34</td>
        <td>Stuttgart</td>
        <td>None</td>
        <td>Germany</td>
        <td>70174</td>
        <td>1.98</td>
    </tr>
    <tr>
        <td>2</td>
        <td>4</td>
        <td>2009-01-02 00:00:00</td>
        <td>Ullevålsveien 14</td>
        <td>Oslo</td>
        <td>None</td>
        <td>Norway</td>
        <td>0171</td>
        <td>3.96</td>
    </tr>
    <tr>
        <td>3</td>
        <td>8</td>
        <td>2009-01-03 00:00:00</td>
        <td>Grétrystraat 63</td>
        <td>Brussels</td>
        <td>None</td>
        <td>Belgium</td>
        <td>1000</td>
        <td>5.94</td>
    </tr>
</table>



## Question 3:

Find total sales by country, round to 2 decimal places.


```python
%%sql

SELECT BillingCountry as COUNTRY,
round(SUM(Total),2) as TOTAL_SALES

FROM Invoice
GROUP BY BillingCountry
```

     * sqlite:///oreilly_getting_started_with_sql/extra_practice_database.db
    Done.





<table>
    <tr>
        <th>COUNTRY</th>
        <th>TOTAL_SALES</th>
    </tr>
    <tr>
        <td>Argentina</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>Australia</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>Austria</td>
        <td>42.62</td>
    </tr>
    <tr>
        <td>Belgium</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>Brazil</td>
        <td>190.1</td>
    </tr>
    <tr>
        <td>Canada</td>
        <td>303.96</td>
    </tr>
    <tr>
        <td>Chile</td>
        <td>46.62</td>
    </tr>
    <tr>
        <td>Czech Republic</td>
        <td>90.24</td>
    </tr>
    <tr>
        <td>Denmark</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>Finland</td>
        <td>41.62</td>
    </tr>
    <tr>
        <td>France</td>
        <td>195.1</td>
    </tr>
    <tr>
        <td>Germany</td>
        <td>156.48</td>
    </tr>
    <tr>
        <td>Hungary</td>
        <td>45.62</td>
    </tr>
    <tr>
        <td>India</td>
        <td>75.26</td>
    </tr>
    <tr>
        <td>Ireland</td>
        <td>45.62</td>
    </tr>
    <tr>
        <td>Italy</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>Netherlands</td>
        <td>40.62</td>
    </tr>
    <tr>
        <td>Norway</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>Poland</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>Portugal</td>
        <td>77.24</td>
    </tr>
    <tr>
        <td>Spain</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>Sweden</td>
        <td>38.62</td>
    </tr>
    <tr>
        <td>USA</td>
        <td>523.06</td>
    </tr>
    <tr>
        <td>United Kingdom</td>
        <td>112.86</td>
    </tr>
</table>



## Question 4:
Calculate Total sales by customer, give their first and last names. Round to 2 decimals.


```python
%%sql

SELECT 
Customer.CustomerId,
FirstName,
LastName,

round(SUM(Total),2) as TOTAL_SALES

FROM Invoice INNER JOIN Customer 
ON Invoice.CustomerId = Customer.CustomerId

GROUP BY Customer.CustomerId, FirstName, LastName


```

     * sqlite:///oreilly_getting_started_with_sql/extra_practice_database.db
    Done.





<table>
    <tr>
        <th>CustomerId</th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>TOTAL_SALES</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Luís</td>
        <td>Gonçalves</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Leonie</td>
        <td>Köhler</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>3</td>
        <td>François</td>
        <td>Tremblay</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Bjørn</td>
        <td>Hansen</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>5</td>
        <td>František</td>
        <td>Wichterlová</td>
        <td>40.62</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Helena</td>
        <td>Holý</td>
        <td>49.62</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Astrid</td>
        <td>Gruber</td>
        <td>42.62</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Daan</td>
        <td>Peeters</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Kara</td>
        <td>Nielsen</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>10</td>
        <td>Eduardo</td>
        <td>Martins</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>11</td>
        <td>Alexandre</td>
        <td>Rocha</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>12</td>
        <td>Roberto</td>
        <td>Almeida</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>13</td>
        <td>Fernanda</td>
        <td>Ramos</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>14</td>
        <td>Mark</td>
        <td>Philips</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>15</td>
        <td>Jennifer</td>
        <td>Peterson</td>
        <td>38.62</td>
    </tr>
    <tr>
        <td>16</td>
        <td>Frank</td>
        <td>Harris</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>17</td>
        <td>Jack</td>
        <td>Smith</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>18</td>
        <td>Michelle</td>
        <td>Brooks</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>19</td>
        <td>Tim</td>
        <td>Goyer</td>
        <td>38.62</td>
    </tr>
    <tr>
        <td>20</td>
        <td>Dan</td>
        <td>Miller</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>21</td>
        <td>Kathy</td>
        <td>Chase</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>22</td>
        <td>Heather</td>
        <td>Leacock</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>23</td>
        <td>John</td>
        <td>Gordon</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>24</td>
        <td>Frank</td>
        <td>Ralston</td>
        <td>43.62</td>
    </tr>
    <tr>
        <td>25</td>
        <td>Victor</td>
        <td>Stevens</td>
        <td>42.62</td>
    </tr>
    <tr>
        <td>26</td>
        <td>Richard</td>
        <td>Cunningham</td>
        <td>47.62</td>
    </tr>
    <tr>
        <td>27</td>
        <td>Patrick</td>
        <td>Gray</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>28</td>
        <td>Julia</td>
        <td>Barnett</td>
        <td>43.62</td>
    </tr>
    <tr>
        <td>29</td>
        <td>Robert</td>
        <td>Brown</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>30</td>
        <td>Edward</td>
        <td>Francis</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>31</td>
        <td>Martha</td>
        <td>Silk</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>32</td>
        <td>Aaron</td>
        <td>Mitchell</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>33</td>
        <td>Ellie</td>
        <td>Sullivan</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>34</td>
        <td>João</td>
        <td>Fernandes</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>35</td>
        <td>Madalena</td>
        <td>Sampaio</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>36</td>
        <td>Hannah</td>
        <td>Schneider</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>37</td>
        <td>Fynn</td>
        <td>Zimmermann</td>
        <td>43.62</td>
    </tr>
    <tr>
        <td>38</td>
        <td>Niklas</td>
        <td>Schröder</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>39</td>
        <td>Camille</td>
        <td>Bernard</td>
        <td>38.62</td>
    </tr>
    <tr>
        <td>40</td>
        <td>Dominique</td>
        <td>Lefebvre</td>
        <td>38.62</td>
    </tr>
    <tr>
        <td>41</td>
        <td>Marc</td>
        <td>Dubois</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>42</td>
        <td>Wyatt</td>
        <td>Girard</td>
        <td>39.62</td>
    </tr>
    <tr>
        <td>43</td>
        <td>Isabelle</td>
        <td>Mercier</td>
        <td>40.62</td>
    </tr>
    <tr>
        <td>44</td>
        <td>Terhi</td>
        <td>Hämäläinen</td>
        <td>41.62</td>
    </tr>
    <tr>
        <td>45</td>
        <td>Ladislav</td>
        <td>Kovács</td>
        <td>45.62</td>
    </tr>
    <tr>
        <td>46</td>
        <td>Hugh</td>
        <td>O&#x27;Reilly</td>
        <td>45.62</td>
    </tr>
    <tr>
        <td>47</td>
        <td>Lucas</td>
        <td>Mancini</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>48</td>
        <td>Johannes</td>
        <td>Van der Berg</td>
        <td>40.62</td>
    </tr>
    <tr>
        <td>49</td>
        <td>Stanisław</td>
        <td>Wójcik</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>50</td>
        <td>Enrique</td>
        <td>Muñoz</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>51</td>
        <td>Joakim</td>
        <td>Johansson</td>
        <td>38.62</td>
    </tr>
    <tr>
        <td>52</td>
        <td>Emma</td>
        <td>Jones</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>53</td>
        <td>Phil</td>
        <td>Hughes</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>54</td>
        <td>Steve</td>
        <td>Murray</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>55</td>
        <td>Mark</td>
        <td>Taylor</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>56</td>
        <td>Diego</td>
        <td>Gutiérrez</td>
        <td>37.62</td>
    </tr>
    <tr>
        <td>57</td>
        <td>Luis</td>
        <td>Rojas</td>
        <td>46.62</td>
    </tr>
    <tr>
        <td>58</td>
        <td>Manoj</td>
        <td>Pareek</td>
        <td>38.62</td>
    </tr>
    <tr>
        <td>59</td>
        <td>Puja</td>
        <td>Srivastava</td>
        <td>36.64</td>
    </tr>
</table>




```python

```
