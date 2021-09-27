# Media Distribution and Data Streams 6

## Tips for the project site hosting

Deploying & hosting a React application in Azure environment.

### Option 1: HashRouter, basic build & manual deployment

- simplest & "cheapest" solution
- use `<HashRouter>` in React
- create a production build of the React app (`npm run build`) and copy/upload the files inside `build/` folder into your server's `/var/www/html/` directory (or similar, may depend on your site configuration in Apache)
- Check that your Apache configuration is set to serve the correct folder

### Option 2: BrowserRouter & Apache

- just like the option 1 but get rid of the annoying `#`-signs in URLs
- Use [`<BrowserRouter>`](https://reactrouter.com/web/api/BrowserRouter) as Router instead of `<HashRouter>`
- Apache rewrite module is used to redirect all application requests to the React app's _index.html_. This configuration can placed in `/etc/sites-enabled/xxxxx.conf` configuration file or using [`.htaccess`](https://httpd.apache.org/docs/current/howto/htaccess.html) file inside the public html folder, example using default site configuration:

  ```conf
  <IfModule mod_ssl.c>
  <VirtualHost *:443>
    DocumentRoot /var/www/html/
    ServerName myservername.example.com
    ServerAdmin my-admin-email@exammple.com

  # For react router
    <Directory "/var/www/html">

      RewriteEngine on
      # Don't rewrite files or directories
      RewriteCond %{REQUEST_FILENAME} -f [OR]
      RewriteCond %{REQUEST_FILENAME} -d
      RewriteRule ^ - [L]
      # Rewrite everything else to index.html to allow html5 state links
      RewriteRule ^ index.html [L]
    </Directory>

    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/PATH-TO-YOUR-CERT-FILE
    SSLCertificateKeyFile /etc/letsencrypt/live/PATH-TO-YOUR-KEY-FILE
  </VirtualHost>
  </IfModule>
  ```

- or `.htaccess` (use of redirects with .htaccess files must be enabled in Apache configuration):

  ```conf
  RewriteEngine on
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
  ```

### Option 3: Serve the client app using Node.js

- This is a good option if you want to develop and deploy a backend application (for example a REST API using node.js) in addition to client (React) app
- Combine Node.js backend and React client app, [idea is introduced in this article](https://medium.com/weekly-webtips/create-and-deploy-your-first-react-web-app-with-a-node-js-backend-ec622e0328d7) but we DON'T use Heroku for deployment 
- On Ubuntu server, use pm2 to run your node.js server and add Apache proxy configuration to serve the node.js server (running e.g. on port 3000) secure using https on port 443 (refer to previous assignments for details)

### Option 4: Azure Web app

- Read & adapt: [Deploy a React App to Azure](https://www.pluralsight.com/guides/deploy-a-react-app-to-azure)
