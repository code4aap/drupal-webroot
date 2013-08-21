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


TO BE UPDATED Commit Policy
===========

This repo will be merge only, human commits should be kept to bare minimum. If you
wish to get a contributed module added to this repo, then fork the branch and send
a pull request and after discussion on why/what on module, it'll be merged into drupal-webroot

Symlinks to Drupal aap campaign
===============================

This repo will have appropriate symlinks to appropriate folders in drupal-aap-campaign
repo. You can find symlinks in the following locations:

* drupal-webroot/profiles/
* drupal-webroot/sites/all/modules/
* drupal-webroot/sites/all/themes/
