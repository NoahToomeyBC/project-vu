<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://piechart-project.herokuapp.com/">
    <img src="https://beingalivela.org/wp-content/uploads/2015/01/mental-health.jpg" alt="Logo" width="500" height="400">

  <a href="https://github.com/KimBro763/project-vu">
    <img src="https://user-images.githubusercontent.com/84995704/139769526-fa05e437-32e5-4052-9215-61dd79618495.png" alt="Logo" width="300" height="300">
  </a>

<h3 align="center"> Impacts of Mental Health Based on Access to Care and Employment </h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#Data-Sources">Data Sources</a></li>
        <li><a href="#Data-Cleaning">Data Cleaning</a></li>
      </ul>
    </li>
    <li><a href="#Data-Visualization">Data Visualization</a></li>
    <li><a href="#Machine-Learning">Machine Learning</a></li>
    <li><a href="#Dashboard">Dashboard</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<br />
<div align="left">
  <a href="https://github.com/NoahToomeyBC/project-vu">
    <img src="https://cdn1.onlinecounselingprograms.com/content/d58803d7d7b84778a00900d55edb0f26/9646_OCP_Managing-Your-Mental-Health-in-College-hero.jpg" alt="Logo" width="1200" height="150">
  </a>


### Built With

* [Tabula](https://tabula.technology/)
* [Pandas](https://pandas.pydata.org/)
* [Postgresql](https://www.postgresql.org/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Leaflet.js](https://leafletjs.com/)
* [Mapbox API] (https://mapbox.com/)
* [jQuery](https://jquery.com/)




<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Data Sources

1. Get a free API Key at [https://www.mapbox.com/](https://www.mapbox.com/) after signing up for an account (It's Free!)

2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install Requirements in your preffered bash CLI
   ```sh
   conda activate YOURENV
   cd ../your_git_directory/project-vu/
   pip install requirements.txt
   ```
4. Enter your mapbox API key in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
 5. Run The Application
  ``` sh
  cd ../project-vu/app
  flask run
  ```
  OR
  ```sh
  cd ../project-vu/app
  python app.py
  ```
  
## Data Cleaning
 
### PDF Cleaning

In order to get workable data, researchers used Tabula to scrape mental health demographic information from Mental Health America's State of Mental Health in America yearly reports (see below for links to relevant PDFs). Each of the tables pulled presented unique issues for data engineers to overcome. Nearly all of the tables were split in two and given repetitive, nondescript variable names. To address this, data engineers split the tables into two data-frames with matching variable names for columns and joined the two back together. Null values were handled with the ```.dropna(how='all')``` method for data that doesn't add value and the population column's dtypes were changed to floats to allow for operations on them to be done in the future. Other operations done include dropping rows with bad data where strings from the description of the table had been pulled into the table itself due to an interaction between the PDFs and Tabula.

Notebooks used to preform cleaning can be found in [github_link](github_link where PDF cleaning notebooks live)

#### PDF Links
* [2019 MHA PDF](https://mhanational.org/sites/default/files/2019-09/2019%20MH%20in%20America%20Final.pdf)
* [2020 MHA PDF](https://mhanational.org/sites/default/files/State%20of%20Mental%20Health%20in%20America%20-%202020_0.pdf)
* [2020 MHA PDF](https://mhanational.org/sites/default/files/2021%20State%20of%20Mental%20Health%20in%20America_0.pdf)


We have also pulled data from NHIS. The target population for the NHIS is the civilian noninstitutionalized population residing within 
the 50 states and the District of Columbia at the time of the interview.the sample is expected to yield 30,000 sample adult completed interviews. Data cleaning for for this part includes decoding the survery documentationa and extract the data that is valuable to our project. Then, we created state_region data to link this regionl data with other state level data by aggregating the part that we used in our ML process. 
#### Links to public data that's been applied to our project 
* [NHIS](https://www.cdc.gov/nchs/nhis/2020nhis.html)

## Database Management

### Data Storage
  Our database can be accessed through a virtual server connected to Amazon Web Service's Relational Database Service. The server was then accessed through PgAdmin4 by researchers to allow for data exploration and visualization
  
### SQL Loader
A [python script](https://github.com/PazilatNur/project-vu/blob/main/dataframe_sql_loader.ipynb) was created to allow for most of our cleaned CSVs to be loaded into our Postgres server at once with minimal hassle. The loader works first loading all CSV file locations into a list, the list is then further cleaned by removing all redundant or unnecessary information (ie. PDFs, no longer relevant CSVs) and then the list is loaded into a for loop that accesses file locations and turns all relevant CSVs into dataframes and appends them all to a dictionary. In order to get the file names set as the table names in postgres, the list was ran through a for loop that dropped all file extensions from the items in the list. From there, the list was then further converted into a tuple which allowed the name to be loaded into the final for loop. Next, the connection to the database was setup using a formatted db_string that was loaded as our connection engine for SQLalchemy. Finally, the for loop was created that accessed the zipped dataframes inside df_dict{} and the zipped table titles.

### PGAdmin Table Explanation
- master_bystate_table
  - This table has all the tables joined together based on the primary key of state. This keying convention is held throughout most all tables.
- Regional Tables: These tables are split up based on regions as described by the [United States Census Bureau](https://www2.census.gov/geo/pdfs/maps-data/maps/reference/us_regdiv.pdf)
  - northeast_table 
  - western_table
  - southern_table
  - midwest_table
 - Adult-master-year Table:
  - This table includes all of our collected adult_mental_health data with additional year column. 
 - Youth and Adult Tables
  - Additionally, tables were split from the master_bystate_table to only include either youth or adult data.
 - Schemas
  - SQL Queries can be found [here](https://github.com/PazilatNur/project-vu/tree/main/sql_schema_and_misc)
  
 
  
  
<p align="right">(<a href="#top">back to top</a>)</p>  

  
## Data Visualization

We utilized both Leaflet and Plotly to handle all of our visualizations which can be accessed through our [website!](https://piechart-project.herokuapp.com) 

<p align="right">(<a href="#top">back to top</a>)</p>



## Machine Learning
 
  Science
  
Please ML folder for ML related updates
  
<p align="right">(<a href="#top">back to top</a>)</p>



## Website
  
You can access our website [here](https://piechart-project.herokuapp.com)
  
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



## Contact

- Pazi Nur - [https://github.com/PazilatNur](https://github.com/PazilatNur)
- Noah Toomey - [https://github.com/NoahToomeyBC](https://github.com/NoahToomeyBC)
- Ryan Grady -  [https://github.com/ryan22grady](https://github.com/ryan22grady)


Project Link: [https://github.com/github_username/repo_name](https://github.com/NoahToomeyBC/project-vu)

Project Link: [https://github.com/github_username/repo_name](https://github.com/NoahToomeyBC/project-vu)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [README Template Refactored From <br> https://github.com/othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/NoahToomeyBC/project-vu.svg?style=for-the-badge
[contributors-url]: https://github.com/NoahToomeyBC/project-vu/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/NoahToomeyBC/project-vu.svg?style=for-the-badge
[forks-url]: https://github.com/KimBro763/project-vu/network/members
[stars-shield]: https://img.shields.io/github/stars/NoahToomeyBC/project-vu.svg?style=for-the-badge
[stars-url]: https://github.com/KimBro763/project-vu/stargazers
[issues-shield]: https://img.shields.io/github/issues/NoahToomeyBC/project-vu.svg?style=for-the-badge
[issues-url]: https://github.com/KimBro763/project-vu/issues
[license-shield]: https://img.shields.io/github/license/NoahToomeyBC/project-vu.svg?style=for-the-badge
[license-url]: https://github.com/NoahToomeyBC/project-vublob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png

