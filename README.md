 # СПП
 
 ### Разработка приложения "Система автоматизации документооборота средней школы"

 ##### Ветка разработки


|                      Use case block |              URL               | Methods  |
|------------------------------------:|:------------------------------:|:--------:|
|                    List of students |           /students            |   GET    |
|                        Student page |         /students/:id          |   GET    |
|                      Student rating |        /students/rating        |   GET    |
|                       List of marks |   /students/:id/marks/:term    |   GET    |
|            List of academic results |  /students/:id/results/:term   |   GET    |
| List of marks for the last week (?) | /students/:id/marks/last-week  |   GET    |
|                      List of groups |            /groups             |   GET    |
|                          Group page |          /groups/:id           |   GET    |
|                        Group rating |         /groups/rating         |   GET    |
|                   Group miss rating |       /groups/:id/skips        |   GET    |
|       List of marks for the subject | /groups/:id/marks/subjects/:id |   GET    |
|       List of subjects for the term | /groups/:id/subjects/terms/:id |   GET    |
|                    List of vouchers |           /vouchers            |   GET    |
|                        Voucher page |         /vouchers/:id          |   GET    |
|                    List of teachers |           /teachers            |   GET    |
|                      Teacher's page |         /teachers/:id          |   GET    |
|                    Teacher's groups |      /teachers/:id/groups      |   GET    |