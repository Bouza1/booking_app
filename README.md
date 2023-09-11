# Tennis Court Booking App!
<div align="center" style="width:100%;">
 <img src="https://github.com/Bouza1/booking_app/assets/97123953/ad9f73c9-35bf-42ec-be01-4d2c8bbf1a99" alt="Tennis Club Logo" width="100%">
</div>

## Description
A light-weight, user-friendly tennis court booking application that enables users to easily log in and reserve tennis courts. The app streamlines the booking process and is built with a secure login system and an intuitive interface. Reserving a tennis court has never been simpler. 

Please visit: [www.wsscctennis.co.uk](https://www.wsscctennis.co.uk) to see the site in action.

## Built With:
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Mobile Friendly:
| Login | Booking |
| --- | --- |
| <img src="https://github.com/Bouza1/booking_app/assets/97123953/bac1a9d7-37f9-4291-aa81-53d72ae9027e"> | <img src="https://github.com/Bouza1/booking_app/assets/97123953/dfc119be-1d63-4e41-88df-09511a7dac0d"> | 
| <img src="https://github.com/Bouza1/booking_app/assets/97123953/0d97e34a-8bcd-4ef6-a8da-47393d8e6b85"> | <img src="https://github.com/Bouza1/booking_app/assets/97123953/5df92114-488d-4b4a-827f-4123a2faf4df"> |

## Issues & Mitigations:
- Security:
The use of an SQLite database brings with it some security flaws and vulnerabillites, for instance there is little to no access control. To mitigate these concerns and enhance the security of the database as a whole, a mitigation has been deployed. By encrypting all data stored within the database using the Advanced Encryption Standard (AES), it can be assured there is little value to any threat actors should the encrypted data be retrieved.

- Backups:
The site is hosted through replit along with the SQLite database, albeit via a custom domain this simplistic approach presents a serious issue. Replit does not allow files to persist through deployments and therefore any data stored within the database is destroyed upon redeployment of the site. To mitigate this issue, a download route has been built into the application, the route only allows certain users access and includes several other preventative measures to stop it being exploited.

## Future Developments
Following on from the issues mentioned above the next stage of development is to intergrate a PostgreSQL database and deploy to and EC2 instance on AWS, which will provide a much more robust system capable of persisting the database through deployments.







