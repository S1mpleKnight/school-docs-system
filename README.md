 # СПП
 
 ### Разработка приложения "Система автоматизации документооборота средней школы"

 ##### Ветка разработки


|                      Use case block |                URL                |        Methods         |        Status        |
|------------------------------------:|:---------------------------------:|:----------------------:|:--------------------:|
|                    List of students |             /students             | GET, POST, PUT, DELETE |  :white_check_mark:  |
|                      Student rating |         /students/rating          |          GET           | :white_large_square: |
|                       List of marks |     /marks/:term/students/:id     |          GET           |  :white_check_mark:  |
|            List of academic results |    /students/:id/results/:term    |          GET           | :white_large_square: |
|       Student marks for the subject | /students/:id/marks/subjects/:id  |          GET           | :white_large_square: |
| List of marks for the last week (?) | /students/:id/marks/weeks/:number |          GET           | :white_large_square: |
|                      List of groups |              /groups              | GET, POST, PUT, DELETE |  :white_check_mark:  |
|                        Group rating |          /groups/rating           |          GET           | :white_large_square: |
|       List of students of the group |       /groups/:id/students        |          GET           |  :white_check_mark:  |
|       List of marks for the subject |  /groups/:id/marks/subjects/:id   |          GET           | :white_large_square: |
|       List of subjects for the term |  /groups/:id/subjects/terms/:id   |          GET           | :white_large_square: |
|                    List of vouchers |             /vouchers             |       GET, POST        |  :white_check_mark:  |
|                        Voucher page |           /vouchers/:id           |          GET           |  :white_check_mark:  |
|                    List of teachers |             /teachers             | GET, POST, PUT, DELETE |  :white_check_mark:  |
|                    Teacher's groups |       /teachers/:id/groups        |          GET           | :white_large_square: |
|                               Login |              /login               |          POST          |  :white_check_mark:  |
|                               Terms |              /terms               | GET, POST, PUT, DELETE |  :white_check_mark:  |
|                           Timetable |            /timetable             |          GET           |  :white_check_mark:  |
|                            Subjects |             /subjects             | GET, POST, PUT, DELETE |  :white_check_mark:  |
