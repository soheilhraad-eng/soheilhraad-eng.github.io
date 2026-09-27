source "https://rubygems.org"

# The exact gem set GitHub Pages builds with, so a local preview matches the live site.
gem "github-pages", group: :jekyll_plugins

# Ruby 3.0+ no longer ships a web server; `jekyll serve` needs this one.
gem "webrick", "~> 1.8"

# Windows has no time-zone database of its own, and needs wdm to notice file changes.
platforms :windows do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1"
end
