Drupal Webroot
==============

Drupal-webroot repository will contain Drupal core (with all its history) and Contributed
Modules. 7.x-1.x-dev is the branch where all the action lies, this branch will be
kept upto date with future Drupal 7 releases (currently its in sync with Drupal 7.19)

Setting up your AAP campaign site on your localhost
===================================================

Setup should be simple, and allow a distributed team to work seamlessly. Below are the steps -

1. Login to your github.com account. Say your username there is - GITHUBUSER (**NOTE:** In all the steps below replace this with your actual username)
2. Fork this repository to your account - https://github.com/code4aap/drupal-webroot so that it becomes - https://github.com/GITHUBUSER/drupal-webroot
3. Fork this second repository to your account - https://github.com/code4aap/drupal-aap-campaign so that it becomes - https://github.com/GITHUBUSER/drupal-aap-campaign
4. Goto your localhost webroot folder
5. git clone git@github.com:GITHUBUSER/drupal-webroot.git
6. git clone git@github.com:GITHUBUSER/drupal-aap-campaign.git
7. Create a database using mysqladmin or any other tool
8. Download the latest development database snapshot (use 'quickback' optoin) from here - http://v1.aapkidilli.in/admin/config/system/backup_migrate (**NOTE:** you can collect site user/pass from somebody in the development team)
9. Import database backup from the previous step into the database you created on your local 2 steps before
10. Update your settings.php file accordingly and get started :-) 


##Setting up AAP website in localhost Ubuntu/Debian Environment. 
###Requirements Installation###
```
sudo apt-get install mysql-server
```
*After the mysql-server installation it will ask for root password. Provide a password ex : `sonia`*

```
sudo apt-get install phpmyadmin
```
*After the phpmyadmin installation it will ask for mysql root password . Provide mysql root password ex :`sonia`*

```
sudo a2enmod rewrite
sudo service apache2 restart
```
replace all content in /etc/apache2/sites-enables/000-default with the following content
```
<VirtualHost *:80>
        ServerAdmin webmaster@localhost

        DocumentRoot /var/www
        <Directory />
                Options FollowSymLinks
                AllowOverride All
        </Directory>
        <Directory /var/www/>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all
        </Directory>

        ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
        <Directory "/usr/lib/cgi-bin">
                AllowOverride None
                Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
                Order allow,deny
                Allow from all
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log

        # Possible values include: debug, info, notice, warn, error, crit,
        # alert, emerg.
        LogLevel warn

        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

```

**Execute the following commands**

```
cd /var/www/
rm index.html
git clone git@github.com:GITHUBUSER/drupal-webroot.git
git clone git@github.com:GITHUBUSER/drupal-aap-campaign.git
```
###Create the Database
**Goto http://localhost/phpmyadmin**

 1. Enter the username(`root`) and password (`sonia`) and login
 2. Enter `aap` in the box and click create database.

Create a file named `settings.php` in /var/www/drupal-webroot/sites/default/
and paste the following content
```
<?php
$databases = array (
  'default' =>
  array (
    'default' =>
    array (
      'database' => 'aap',
      'username' => 'root',
      'password' => 'sonia',
      'host' => 'localhost',
      'port' => '',
      'driver' => 'mysql',
      'prefix' => '',
    ),
  ),
);

$update_free_access = FALSE;

$drupal_hash_salt = 'MLRELOXqkubIx0UyBEpYGpaU5MV0quPW6F4EKP1w924';
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 100);
ini_set('session.gc_maxlifetime', 200000);
ini_set('session.cookie_lifetime', 2000000);

$conf['404_fast_paths_exclude'] = '/\/(?:styles)\//';
$conf['404_fast_paths'] = '/\.(?:txt|png|gif|jpe?g|css|js|ico|swf|flv|cgi|bat|pl|dll|exe|asp)$/i';
$conf['404_fast_html'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL "@path" was not found on this server.</p></body></html>';


?>
```

To access your local environment 

**Goto** http://localhost/drupal-webroot/



To be updated commit policy
===========================

This repo will be merge only, human commits should be kept to bare minimum. If you
wish to get a contributed module added to this repo, then fork the branch and send
a pull request and after discussion on why/what on module, it'll be merged into drupal-webroot

Symlinks to drupal aap campaign
===============================

This repo will have appropriate symlinks to appropriate folders in drupal-aap-campaign
repo. You can find symlinks in the following locations:

* drupal-webroot/profiles/
* drupal-webroot/sites/all/modules/
* drupal-webroot/sites/all/themes/


IRC Channel
===========
```
irc server : irc.freenode.net
channel name:  #aaptechteam
```
To connect to the channel click the following link. 

http://webchat.freenode.net/?channels=%23aaptechteam&uio=Mj10cnVlJjk9dHJ1ZSYxMj10cnVl55


