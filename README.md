DevCharts
=========
!['chart_example'](http://i1158.photobucket.com/albums/p618/g12mcgov/Screenshot2014-08-22002812.png)

Hi. Are you a dev? Do you like pretty charts? Do you store your code in Dropbox? Do you like to show off how much you've written <b>and</b> what you've written?

Alas! DevCharts is for you (and your personal site).


What is it
=========
DevCharts is a simple javascript widget to generate highcharts based on file extensions in a user's dropbox. It works by monitoring for changes in your Dropbox. It specifically looks for a given set of code-file extensions, and generates a pie chart based on the number of files it finds.

This pie chart then reflects not only the amount of overall code you write but <i>the language</i> in which you write it.

It's a great way to show off on that personal site of yours that you mean business.

By using Dropbox's <code>delta</code> API endpoint and long-polling, it always stays up to date.






