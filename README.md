# CHIVO/web

The web application for CHIVO. This application is developed with RefineryCMS (Ruby on Rails).

## Setup

### Requeriments

* Ruby >= 2.0
* Rails = 3.2

### Installation

    git clone git@github.com:ChileanVirtualObservatory/web.git
    bundle install
    rake db:migrate
    rake db:seed

### Run

    rails s

then visit `http://localhost:3000/refinery` and create your admin user.