# SSH
npmci allows easy usage of ssh:

## Add the SSH KEY to the environment

To make npmci aware of any SSH KEY add it to the environment in the following format
```
# Key
NPMCI_SSHKEY_[A_NAME_FROM_YOU]
# Value:
[targeted host]|[privatekey as base64]|***
```

## Use npmci cli tool in your ci script
```
npmci prepare ssh
npmci command git remote add heroku ssh://git@heroku.com/[you project name].git
npmci command git push heroku master
```
