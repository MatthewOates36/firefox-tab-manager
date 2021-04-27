const search = new URLSearchParams(location.search)

location.replace(search.get('url'))