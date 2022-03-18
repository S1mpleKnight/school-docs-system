 # СПП
 
 ### Разработка приложения "Система автоматизации документооборота средней школы"

 ##### Ветка разработки


|                      Use case block |                URL                |  Methods  |        Status        |
|------------------------------------:|:---------------------------------:|:---------:|:--------------------:|
|                    List of students |             /students             | GET, POST |  :white_check_mark:  |
|                        Student page |           /students/:id           |    GET    |  :white_check_mark:  |
|                      Student rating |         /students/rating          |    GET    | :white_large_square: |
|                       List of marks |     /students/:id/marks/:term     |    GET    | :white_large_square: |
|            List of academic results |    /students/:id/results/:term    |    GET    | :white_large_square: |
|       Student marks for the subject | /students/:id/marks/subjects/:id  |    GET    | :white_large_square: |
| List of marks for the last week (?) | /students/:id/marks/weeks/:number |    GET    | :white_large_square: |
|                      List of groups |              /groups              | GET, POST |  :white_check_mark:  |
|                          Group page |            /groups/:id            |    GET    |  :white_check_mark:  |
|                        Group rating |          /groups/rating           |    GET    | :white_large_square: |
|                   Group miss rating |         /groups/:id/skips         |    GET    | :white_large_square: |
|       List of marks for the subject |  /groups/:id/marks/subjects/:id   |    GET    | :white_large_square: |
|       List of subjects for the term |  /groups/:id/subjects/terms/:id   |    GET    | :white_large_square: |
|                    List of vouchers |             /vouchers             | GET, POST | :white_large_square: |
|                        Voucher page |           /vouchers/:id           |    GET    | :white_large_square: |
|                    List of teachers |             /teachers             | GET, POST |  :white_check_mark:  |
|                      Teacher's page |           /teachers/:id           |    GET    |  :white_check_mark:  |
|                    Teacher's groups |       /teachers/:id/groups        |    GET    | :white_large_square: |
|                               Login |              /login               |   POST    |  :white_check_mark:  |