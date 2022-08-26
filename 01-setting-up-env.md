# Media Distribution and Data Streams 1

## Materials & links

Browse, read, watch & study:

- [Get started with Azure](https://azure.microsoft.com/en-us/get-started/)
- [MS Azure Youtube channel](https://www.youtube.com/channel/UC0m-80FnNY2Qb7obvTL_2fA)
- [Azure portal](https://portal.azure.com/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/)
- [Azure firewall](https://docs.microsoft.com/en-us/azure/firewall/)
- [Azure network security group](https://docs.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview)
- [Using Linux command line](https://ubuntu.com/tutorials/command-line-for-beginners)
- [The Beginner’s Guide to Nano, the Linux Command-Line Text Editor](https://www.howtogeek.com/howto/42980/the-beginners-guide-to-nano-the-linux-command-line-text-editor/)
- [Ubuntu package management](https://ubuntu.com/server/docs/package-management)
- [Ubuntu firewall](https://ubuntu.com/server/docs/security-firewall)

## Setting up the environment

1. Sign up for a free [student account](https://azure.microsoft.com/en-us/free/students/) using your school email address & login, you should get some free credits (100 USD), [more info](https://docs.microsoft.com/en-us/azure/education-hub/azure-dev-tools-teaching/program-faq)
1. Go to [Azure portal](https://portal.azure.com/)
1. Create a resource: Virtual machine (VM), use server instance, e.g. latest Ubuntu server LTS)

    - select [VM size](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes) & disks according your needs (What is the minimum for a web server?)
    - NOTE: you have 100 USD to use for the whole course
    - Benefits of using Linux system compared to Windows servers?

1. Use SSH connection for managing your VM (`ssh username@PUBLIC_IP` in terminal/git bash or use e.g. [Putty](https://www.putty.org/))

    - Optional: use public key authenication instead of username/password: [Instructions](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-22-04) 

1. Install Apache (or nginx) & start web server on Linux server

    ```sh
    sudo apt update
    sudo apt upgrade
    sudo apt install apache2
    ```

1. Add a "physical" firewall resource or use the already created Network Security Group resource
1. Check/fix software firewall status & rules on Linux (e.g. limit ssh access)
1. Test with a browser that your web server works and is accessible from internet

### Assignment 1 - Requirements

Virtual environment in Azure containing:

- A virtual server running Linux operating system (Latest Ubuntu LTS distribution preferred)
  - hardware & other specs must meet the needs, explain your choices
  - what is the calculated price, think about the cost-effectiveness
- SSH access to server
- Running web server (Apache of Nginx) on server
  - some sample page accessible from internet
- Firewall with correct rules (physical/software)

Returning: Short report including a network diagram & screen shots of your environment. Check assignment in OMA.  
Grading: max 4 points
