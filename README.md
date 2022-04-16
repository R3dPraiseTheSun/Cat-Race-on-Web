# Cat-Race-on-Web
Sa se implementeze o aplicatie Web oferind utilizatorilor autentificati posibilitatea realizarii de pariuri referitoare la cursele de feline. Sistemul va permite vizualizarea unui istoric al pariurilor si al rezultatelor aferente pentru fiecare concurent (pisica, motan). Se va genera, de asemenea, atat un raport -- minimal, in formatele CSV, HTML, Markdown si XML -- oferind starea actuala a pariurilor, cat si calendarul (disponibil in formatul iCalendar) despre desfasurarea curselor din viitorul apropiat. Pentru fiecare cursa, va exista un termen-limita de realizare a pariurilor. Bonus: simularea serviciului de plata electronica vizand pariurile efectuate.

# Update History:
- version: < __0.1__: 
  - Set up a basic HTML page and hook it to a socket python server, limited button functionality, add as a proof of concept a login form into a modal. Think on the web structure;
- version: __0.1__: **MAJOR**
  - ditch the sockets from the python server and use default HTTP libraries from python itself, understand GET and POST request from web and learn how to send and receive json data types between client and server;
  - add basic Login/Signup functionality **(try email: 'sussyBaker@yahoo.com' with password: 'issussy' and see the magic 'wink'wink'**;
#### ^^WE ARE HERE NOW^^
#### VV Look for the future VV
- version: __0.1 - 0.2__: 
  - Improvements to send/request formula inside server.py;
  - add a customer/power user class in python and javascript and sync them (if it is possible, but at least implement a class for the customer and save data to a JSON);
  - add persistent data (or at least start to implement persistance insite web);
  - GUI overhaul where is defenetly needed(Navbar, Header,...etc.);
  - add article content for Home and About, think of the Races tab article structure and start implementing a base for it;
  - misc stuff maybe;
- version: __0.2__: **MAJOR**
  - currency system done;
  - currency system must be an extension to the user class;
- version __x.xxx__: too much into the future for now to actually give a honest and reliable conclusion
- version __1.0__: app is ready to be shipped, we have cats racing on web and users can bet, ofc losing money on their poor life choices that brought them to our site, idk not my fault tho 🤷‍♂️.

# Useful links
- trello: "https://trello.com/b/4kganZ7L/general"
- public server (if server is up and running): http://79.112.98.122/web/
