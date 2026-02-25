import { useState, useEffect, useMemo } from "react";

const SCHEDULE = {"railroad":"New Mexico Rail Runner Express","effective_date":"October 7, 2024","stations":["Belen","Los Lunas","Isleta Pueblo","Bernalillo Co.","Downtown ABQ","Montaño","Los Ranchos / JC","Sandia Pueblo","Downtown Bernalillo","Sandoval Co. / US 550","Kewa","Santa Fe Co. / NM 599","Zia Road","South Capitol","Santa Fe Depot"],"weekday":{"northbound":{"trains":[{"train":"#502","type":"regular","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"4:32A","Montaño":"4:41A","Los Ranchos / JC":"4:47A","Sandia Pueblo":"4:52A","Downtown Bernalillo":"5:01A","Sandoval Co. / US 550":"5:05A","Kewa":"5:25A","Santa Fe Co. / NM 599":"5:48A","Zia Road":"6:03A","South Capitol":"6:13A","Santa Fe Depot":"6:18A"}},{"train":"#504","type":"regular","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"5:02A","Montaño":"5:11A","Los Ranchos / JC":"5:17A","Sandia Pueblo":"5:22A","Downtown Bernalillo":"5:31A","Sandoval Co. / US 550":"5:35A","Kewa":"5:55A","Santa Fe Co. / NM 599":"6:18A","Zia Road":"6:28A","South Capitol":"6:38A","Santa Fe Depot":"6:43A"}},{"train":"#102","type":"express","stops":{"Belen":"5:36A","Los Lunas":"5:46A","Isleta Pueblo":"5:59A","Bernalillo Co.":"6:07A","Downtown ABQ":"6:19A","Montaño":"6:28A","Los Ranchos / JC":"6:34A","Sandia Pueblo":null,"Downtown Bernalillo":null,"Sandoval Co. / US 550":"6:46A","Kewa":"7:05A","Santa Fe Co. / NM 599":"7:25A","Zia Road":null,"South Capitol":"7:43A","Santa Fe Depot":"7:48A"}},{"train":"#506","type":"regular","stops":{"Belen":"6:35A","Los Lunas":"6:46A","Isleta Pueblo":"6:59A","Bernalillo Co.":"7:06A","Downtown ABQ":"7:19A","Montaño":"7:29A","Los Ranchos / JC":"7:36A","Sandia Pueblo":"7:42A","Downtown Bernalillo":"7:52A","Sandoval Co. / US 550":"7:56A","Kewa":"8:18A","Santa Fe Co. / NM 599":"8:39A","Zia Road":"8:49A","South Capitol":"8:56A","Santa Fe Depot":"9:01A"}},{"train":"#508","type":"regular","stops":{"Belen":"8:04A","Los Lunas":"8:15A","Isleta Pueblo":"8:27A","Bernalillo Co.":"8:35A","Downtown ABQ":"8:43A","Montaño":null,"Los Ranchos / JC":null,"Sandia Pueblo":null,"Downtown Bernalillo":null,"Sandoval Co. / US 550":null,"Kewa":null,"Santa Fe Co. / NM 599":null,"Zia Road":null,"South Capitol":null,"Santa Fe Depot":null}},{"train":"#510","type":"regular","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"9:35A","Montaño":"9:44A","Los Ranchos / JC":"9:50A","Sandia Pueblo":"9:55A","Downtown Bernalillo":"10:03A","Sandoval Co. / US 550":"10:08A","Kewa":"10:28A","Santa Fe Co. / NM 599":"10:51A","Zia Road":"11:01A","South Capitol":"11:11A","Santa Fe Depot":"11:16A"}},{"train":"#512","type":"regular","stops":{"Belen":"9:45A","Los Lunas":"9:56A","Isleta Pueblo":"10:08A","Bernalillo Co.":"10:16A","Downtown ABQ":"10:24A","Montaño":null,"Los Ranchos / JC":null,"Sandia Pueblo":null,"Downtown Bernalillo":null,"Sandoval Co. / US 550":null,"Kewa":null,"Santa Fe Co. / NM 599":null,"Zia Road":null,"South Capitol":null,"Santa Fe Depot":null}},{"train":"#514","type":"regular","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"12:24P","Montaño":"12:33P","Los Ranchos / JC":"12:39P","Sandia Pueblo":"12:44P","Downtown Bernalillo":"12:53P","Sandoval Co. / US 550":"12:58P","Kewa":"1:18P","Santa Fe Co. / NM 599":"1:43P","Zia Road":"1:54P","South Capitol":"2:03P","Santa Fe Depot":"2:08P"}},{"train":"#104","type":"express","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"2:19P","Montaño":"2:32P","Los Ranchos / JC":"2:38P","Sandia Pueblo":null,"Downtown Bernalillo":null,"Sandoval Co. / US 550":"2:49P","Kewa":"3:09P","Santa Fe Co. / NM 599":"3:29P","Zia Road":null,"South Capitol":"3:47P","Santa Fe Depot":"3:52P"}},{"train":"#516","type":"regular","stops":{"Belen":"3:35P","Los Lunas":"3:46P","Isleta Pueblo":"3:59P","Bernalillo Co.":"4:06P","Downtown ABQ":"4:26P","Montaño":"4:35P","Los Ranchos / JC":"4:41P","Sandia Pueblo":"4:46P","Downtown Bernalillo":"4:54P","Sandoval Co. / US 550":"4:59P","Kewa":"5:19P","Santa Fe Co. / NM 599":"5:43P","Zia Road":"5:55P","South Capitol":"6:02P","Santa Fe Depot":"6:07P"}},{"train":"#518","type":"regular","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"5:34P","Montaño":"5:43P","Los Ranchos / JC":"5:49P","Sandia Pueblo":"5:54P","Downtown Bernalillo":"6:07P","Sandoval Co. / US 550":"6:12P","Kewa":"6:34P","Santa Fe Co. / NM 599":"6:57P","Zia Road":"7:09P","South Capitol":"7:19P","Santa Fe Depot":"7:24P"}},{"train":"#520","type":"regular","stops":{"Belen":"5:51P","Los Lunas":"6:01P","Isleta Pueblo":"6:20P","Bernalillo Co.":"6:29P","Downtown ABQ":"6:48P","Montaño":"6:58P","Los Ranchos / JC":"7:06P","Sandia Pueblo":"7:12P","Downtown Bernalillo":"7:23P","Sandoval Co. / US 550":"7:28P","Kewa":"7:50P","Santa Fe Co. / NM 599":"8:13P","Zia Road":"8:23P","South Capitol":"8:33P","Santa Fe Depot":"8:38P"}},{"train":"#522","type":"regular","stops":{"Belen":"7:01P","Los Lunas":"7:12P","Isleta Pueblo":"7:33P","Bernalillo Co.":"7:41P","Downtown ABQ":"7:50P","Montaño":null,"Los Ranchos / JC":null,"Sandia Pueblo":null,"Downtown Bernalillo":null,"Sandoval Co. / US 550":null,"Kewa":null,"Santa Fe Co. / NM 599":null,"Zia Road":null,"South Capitol":null,"Santa Fe Depot":null}},{"train":"#524","type":"friday_only","stops":{"Belen":"8:03P","Los Lunas":"8:14P","Isleta Pueblo":"8:28P","Bernalillo Co.":"8:36P","Downtown ABQ":"8:45P","Montaño":null,"Los Ranchos / JC":null,"Sandia Pueblo":null,"Downtown Bernalillo":null,"Sandoval Co. / US 550":null,"Kewa":null,"Santa Fe Co. / NM 599":null,"Zia Road":null,"South Capitol":null,"Santa Fe Depot":null}}]},"southbound":{"trains":[{"train":"#501","type":"regular","stops":{"Santa Fe Depot":null,"South Capitol":null,"Zia Road":null,"Santa Fe Co. / NM 599":null,"Kewa":null,"Sandoval Co. / US 550":null,"Downtown Bernalillo":null,"Sandia Pueblo":null,"Los Ranchos / JC":null,"Montaño":null,"Downtown ABQ":"4:45A","Bernalillo Co.":"4:54A","Isleta Pueblo":"5:01A","Los Lunas":"5:13A","Belen":"5:24A"}},{"train":"#503","type":"regular","stops":{"Santa Fe Depot":null,"South Capitol":null,"Zia Road":null,"Santa Fe Co. / NM 599":null,"Kewa":null,"Sandoval Co. / US 550":null,"Downtown Bernalillo":null,"Sandia Pueblo":null,"Los Ranchos / JC":null,"Montaño":null,"Downtown ABQ":"5:27A","Bernalillo Co.":"5:38A","Isleta Pueblo":"5:46A","Los Lunas":"6:03A","Belen":"6:14A"}},{"train":"#507","type":"regular","stops":{"Santa Fe Depot":"5:39A","South Capitol":"5:44A","Zia Road":"5:51A","Santa Fe Co. / NM 599":"6:01A","Kewa":"6:19A","Sandoval Co. / US 550":"6:38A","Downtown Bernalillo":"6:43A","Sandia Pueblo":"6:52A","Los Ranchos / JC":"6:57A","Montaño":"7:02A","Downtown ABQ":"7:10A","Bernalillo Co.":"7:19A","Isleta Pueblo":"7:27A","Los Lunas":"7:39A","Belen":"7:50A"}},{"train":"#509","type":"regular","stops":{"Santa Fe Depot":"7:08A","South Capitol":"7:13A","Zia Road":"7:20A","Santa Fe Co. / NM 599":"7:37A","Kewa":"7:55A","Sandoval Co. / US 550":"8:14A","Downtown Bernalillo":"8:18A","Sandia Pueblo":"8:27A","Los Ranchos / JC":"8:32A","Montaño":"8:37A","Downtown ABQ":"8:48A","Bernalillo Co.":"8:57A","Isleta Pueblo":"9:04A","Los Lunas":"9:17A","Belen":"9:29A"}},{"train":"#511","type":"regular","stops":{"Santa Fe Depot":"10:11A","South Capitol":"10:17A","Zia Road":"10:23A","Santa Fe Co. / NM 599":"10:35A","Kewa":"10:52A","Sandoval Co. / US 550":"11:11A","Downtown Bernalillo":"11:15A","Sandia Pueblo":"11:24A","Los Ranchos / JC":"11:29A","Montaño":"11:35A","Downtown ABQ":"11:44A","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#513","type":"regular","stops":{"Santa Fe Depot":"1:02P","South Capitol":"1:07P","Zia Road":"1:14P","Santa Fe Co. / NM 599":"1:26P","Kewa":"1:44P","Sandoval Co. / US 550":"2:03P","Downtown Bernalillo":"2:07P","Sandia Pueblo":"2:16P","Los Ranchos / JC":"2:21P","Montaño":"2:26P","Downtown ABQ":"2:42P","Bernalillo Co.":"2:51P","Isleta Pueblo":"2:58P","Los Lunas":"3:11P","Belen":"3:23P"}},{"train":"#515","type":"regular","stops":{"Santa Fe Depot":"2:46P","South Capitol":"2:52P","Zia Road":"3:00P","Santa Fe Co. / NM 599":"3:11P","Kewa":"3:34P","Sandoval Co. / US 550":"3:54P","Downtown Bernalillo":"3:58P","Sandia Pueblo":"4:07P","Los Ranchos / JC":"4:13P","Montaño":"4:19P","Downtown ABQ":"4:43P","Bernalillo Co.":"4:52P","Isleta Pueblo":"4:59P","Los Lunas":"5:12P","Belen":"5:24P"}},{"train":"#517","type":"regular","stops":{"Santa Fe Depot":"4:15P","South Capitol":"4:20P","Zia Road":"4:27P","Santa Fe Co. / NM 599":"4:39P","Kewa":"4:57P","Sandoval Co. / US 550":"5:16P","Downtown Bernalillo":"5:20P","Sandia Pueblo":"5:29P","Los Ranchos / JC":"5:34P","Montaño":"5:39P","Downtown ABQ":"5:50P","Bernalillo Co.":"6:00P","Isleta Pueblo":"6:07P","Los Lunas":"6:23P","Belen":"6:35P"}},{"train":"#101","type":"express","stops":{"Santa Fe Depot":"5:04P","South Capitol":"5:09P","Zia Road":null,"Santa Fe Co. / NM 599":"5:26P","Kewa":null,"Sandoval Co. / US 550":"6:02P","Downtown Bernalillo":null,"Sandia Pueblo":null,"Los Ranchos / JC":"6:16P","Montaño":"6:21P","Downtown ABQ":"6:32P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#519","type":"regular","stops":{"Santa Fe Depot":"5:30P","South Capitol":"5:35P","Zia Road":"5:42P","Santa Fe Co. / NM 599":"5:54P","Kewa":"6:12P","Sandoval Co. / US 550":"6:31P","Downtown Bernalillo":"6:35P","Sandia Pueblo":"6:44P","Los Ranchos / JC":"6:49P","Montaño":"6:54P","Downtown ABQ":"7:03P","Bernalillo Co.":"7:12P","Isleta Pueblo":"7:20P","Los Lunas":"7:34P","Belen":"7:46P"}},{"train":"#521","type":"regular","stops":{"Santa Fe Depot":"6:46P","South Capitol":"6:51P","Zia Road":"6:58P","Santa Fe Co. / NM 599":"7:10P","Kewa":"7:28P","Sandoval Co. / US 550":"7:47P","Downtown Bernalillo":"7:51P","Sandia Pueblo":"8:00P","Los Ranchos / JC":"8:05P","Montaño":"8:10P","Downtown ABQ":"8:18P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#523","type":"regular","stops":{"Santa Fe Depot":"9:00P","South Capitol":"9:05P","Zia Road":"9:12P","Santa Fe Co. / NM 599":"9:24P","Kewa":"9:42P","Sandoval Co. / US 550":"10:01P","Downtown Bernalillo":"10:05P","Sandia Pueblo":"10:14P","Los Ranchos / JC":"10:19P","Montaño":"10:24P","Downtown ABQ":"10:32P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#525","type":"friday_only","stops":{"Santa Fe Depot":"10:05P","South Capitol":"10:10P","Zia Road":"10:17P","Santa Fe Co. / NM 599":"10:29P","Kewa":"10:47P","Sandoval Co. / US 550":"11:06P","Downtown Bernalillo":"11:10P","Sandia Pueblo":"11:19P","Los Ranchos / JC":"11:24P","Montaño":"11:29P","Downtown ABQ":"11:37P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}}]}},"weekend":{"saturday":{"northbound":{"trains":[{"train":"#702","stops":{"Belen":"7:24A","Los Lunas":"7:34A","Isleta Pueblo":"7:45A","Bernalillo Co.":"7:53A","Downtown ABQ":"8:04A","Montaño":"8:13A","Los Ranchos / JC":"8:19A","Sandia Pueblo":"8:24A","Downtown Bernalillo":"8:32A","Sandoval Co. / US 550":"8:36A","Kewa":"8:54A","Santa Fe Co. / NM 599":"9:15A","Zia Road":"9:26A","South Capitol":"9:34A","Santa Fe Depot":"9:39A"}},{"train":"#704","stops":{"Belen":"9:20A","Los Lunas":"9:30A","Isleta Pueblo":"9:41A","Bernalillo Co.":"9:49A","Downtown ABQ":"10:08A","Montaño":"10:17A","Los Ranchos / JC":"10:23A","Sandia Pueblo":"10:28A","Downtown Bernalillo":"10:37A","Sandoval Co. / US 550":"10:41A","Kewa":"11:02A","Santa Fe Co. / NM 599":"11:25A","Zia Road":"11:36A","South Capitol":"11:44A","Santa Fe Depot":"11:50A"}},{"train":"#706","stops":{"Belen":"12:30P","Los Lunas":"12:40P","Isleta Pueblo":"12:51P","Bernalillo Co.":"12:59P","Downtown ABQ":"1:14P","Montaño":"1:23P","Los Ranchos / JC":"1:29P","Sandia Pueblo":"1:34P","Downtown Bernalillo":"1:42P","Sandoval Co. / US 550":"1:46P","Kewa":"2:04P","Santa Fe Co. / NM 599":"2:25P","Zia Road":"2:36P","South Capitol":"2:44P","Santa Fe Depot":"2:49P"}},{"train":"#708","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"3:11P","Montaño":"3:20P","Los Ranchos / JC":"3:26P","Sandia Pueblo":"3:31P","Downtown Bernalillo":"3:40P","Sandoval Co. / US 550":"3:45P","Kewa":"4:10P","Santa Fe Co. / NM 599":"4:31P","Zia Road":"4:42P","South Capitol":"4:50P","Santa Fe Depot":"4:56P"}},{"train":"#710","stops":{"Belen":"5:40P","Los Lunas":"5:50P","Isleta Pueblo":"6:01P","Bernalillo Co.":"6:09P","Downtown ABQ":"6:20P","Montaño":"6:29P","Los Ranchos / JC":"6:35P","Sandia Pueblo":"6:40P","Downtown Bernalillo":"6:48P","Sandoval Co. / US 550":"6:52P","Kewa":"7:10P","Santa Fe Co. / NM 599":"7:31P","Zia Road":"7:42P","South Capitol":"7:50P","Santa Fe Depot":"7:55P"}},{"train":"#712","stops":{"Belen":"7:43P","Los Lunas":"7:53P","Isleta Pueblo":"8:04P","Bernalillo Co.":"8:12P","Downtown ABQ":"8:23P","Montaño":"8:32P","Los Ranchos / JC":"8:38P","Sandia Pueblo":"8:43P","Downtown Bernalillo":"8:51P","Sandoval Co. / US 550":"8:55P","Kewa":null,"Santa Fe Co. / NM 599":"9:34P","Zia Road":"9:45P","South Capitol":"9:53P","Santa Fe Depot":"9:58P"}},{"train":"#714","stops":{"Belen":"10:40P","Los Lunas":"10:50P","Isleta Pueblo":"11:02P","Bernalillo Co.":"11:08P","Downtown ABQ":"11:16P","Montaño":null,"Los Ranchos / JC":null,"Sandia Pueblo":null,"Downtown Bernalillo":null,"Sandoval Co. / US 550":null,"Kewa":null,"Santa Fe Co. / NM 599":null,"Zia Road":null,"South Capitol":null,"Santa Fe Depot":null}}]},"southbound":{"trains":[{"train":"#703","stops":{"Santa Fe Depot":null,"South Capitol":null,"Zia Road":null,"Santa Fe Co. / NM 599":null,"Kewa":null,"Sandoval Co. / US 550":null,"Downtown Bernalillo":null,"Sandia Pueblo":null,"Los Ranchos / JC":null,"Montaño":null,"Downtown ABQ":"8:21A","Bernalillo Co.":"8:31A","Isleta Pueblo":"8:39A","Los Lunas":"8:50A","Belen":"9:00A"}},{"train":"#705","stops":{"Santa Fe Depot":"10:00A","South Capitol":"10:05A","Zia Road":null,"Santa Fe Co. / NM 599":"10:22A","Kewa":"10:40A","Sandoval Co. / US 550":"11:02A","Downtown Bernalillo":"11:05A","Sandia Pueblo":"11:14A","Los Ranchos / JC":"11:19A","Montaño":"11:25A","Downtown ABQ":"11:35A","Bernalillo Co.":"11:45A","Isleta Pueblo":"11:53A","Los Lunas":"12:04P","Belen":"12:14P"}},{"train":"#707","stops":{"Santa Fe Depot":"12:57P","South Capitol":"1:03P","Zia Road":null,"Santa Fe Co. / NM 599":"1:21P","Kewa":"1:40P","Sandoval Co. / US 550":"2:04P","Downtown Bernalillo":"2:08P","Sandia Pueblo":"2:17P","Los Ranchos / JC":"2:23P","Montaño":"2:28P","Downtown ABQ":"2:38P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#709","stops":{"Santa Fe Depot":"3:05P","South Capitol":"3:10P","Zia Road":"3:18P","Santa Fe Co. / NM 599":"3:27P","Kewa":"3:45P","Sandoval Co. / US 550":"4:03P","Downtown Bernalillo":"4:06P","Sandia Pueblo":"4:17P","Los Ranchos / JC":"4:20P","Montaño":"4:26P","Downtown ABQ":"4:36P","Bernalillo Co.":"4:50P","Isleta Pueblo":"5:10P","Los Lunas":"5:20P","Belen":"5:30P"}},{"train":"#711","stops":{"Santa Fe Depot":"5:55P","South Capitol":"6:09P","Zia Road":"6:17P","Santa Fe Co. / NM 599":"6:27P","Kewa":"6:46P","Sandoval Co. / US 550":"7:10P","Downtown Bernalillo":"7:14P","Sandia Pueblo":"7:23P","Los Ranchos / JC":"7:28P","Montaño":"7:34P","Downtown ABQ":"7:44P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#713","stops":{"Santa Fe Depot":"6:03P","South Capitol":"6:09P","Zia Road":"6:17P","Santa Fe Co. / NM 599":"6:27P","Kewa":"6:46P","Sandoval Co. / US 550":"7:10P","Downtown Bernalillo":"7:14P","Sandia Pueblo":"7:23P","Los Ranchos / JC":"7:28P","Montaño":"7:34P","Downtown ABQ":"7:44P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#715","stops":{"Santa Fe Depot":"8:10P","South Capitol":"8:15P","Zia Road":"8:23P","Santa Fe Co. / NM 599":"8:32P","Kewa":"8:50P","Sandoval Co. / US 550":"9:11P","Downtown Bernalillo":"9:16P","Sandia Pueblo":"9:25P","Los Ranchos / JC":"9:30P","Montaño":"9:36P","Downtown ABQ":"9:46P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#717","stops":{"Santa Fe Depot":"10:14P","South Capitol":"10:19P","Zia Road":"10:27P","Santa Fe Co. / NM 599":"10:36P","Kewa":"10:54P","Sandoval Co. / US 550":"11:13P","Downtown Bernalillo":"11:16P","Sandia Pueblo":null,"Los Ranchos / JC":null,"Montaño":"11:36P","Downtown ABQ":"11:45P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":"10:25P","Belen":null}}]}},"sunday":{"northbound":{"trains":[{"train":"#702","stops":{"Belen":"7:24A","Los Lunas":"7:34A","Isleta Pueblo":"7:45A","Bernalillo Co.":"7:53A","Downtown ABQ":"8:04A","Montaño":"8:13A","Los Ranchos / JC":"8:19A","Sandia Pueblo":"8:24A","Downtown Bernalillo":"8:32A","Sandoval Co. / US 550":"8:36A","Kewa":"8:54A","Santa Fe Co. / NM 599":"9:15A","Zia Road":"9:26A","South Capitol":"9:34A","Santa Fe Depot":"9:39A"}},{"train":"#706","stops":{"Belen":"12:30P","Los Lunas":"12:40P","Isleta Pueblo":"12:51P","Bernalillo Co.":"12:59P","Downtown ABQ":"1:14P","Montaño":"1:23P","Los Ranchos / JC":"1:29P","Sandia Pueblo":"1:34P","Downtown Bernalillo":"1:42P","Sandoval Co. / US 550":"1:46P","Kewa":"2:04P","Santa Fe Co. / NM 599":"2:25P","Zia Road":"2:36P","South Capitol":"2:44P","Santa Fe Depot":"2:49P"}},{"train":"#708","stops":{"Belen":null,"Los Lunas":null,"Isleta Pueblo":null,"Bernalillo Co.":null,"Downtown ABQ":"3:11P","Montaño":"3:20P","Los Ranchos / JC":"3:26P","Sandia Pueblo":"3:31P","Downtown Bernalillo":"3:40P","Sandoval Co. / US 550":"3:45P","Kewa":"4:10P","Santa Fe Co. / NM 599":"4:31P","Zia Road":"4:42P","South Capitol":"4:50P","Santa Fe Depot":"4:56P"}},{"train":"#710","stops":{"Belen":"5:40P","Los Lunas":null,"Isleta Pueblo":"6:01P","Bernalillo Co.":"6:09P","Downtown ABQ":"6:20P","Montaño":"6:29P","Los Ranchos / JC":"6:35P","Sandia Pueblo":"6:40P","Downtown Bernalillo":"6:48P","Sandoval Co. / US 550":"6:52P","Kewa":"7:10P","Santa Fe Co. / NM 599":"7:31P","Zia Road":"7:42P","South Capitol":"7:50P","Santa Fe Depot":"7:55P"}}]},"southbound":{"trains":[{"train":"#701","stops":{"Santa Fe Depot":null,"South Capitol":null,"Zia Road":null,"Santa Fe Co. / NM 599":null,"Kewa":null,"Sandoval Co. / US 550":null,"Downtown Bernalillo":null,"Sandia Pueblo":null,"Los Ranchos / JC":null,"Montaño":null,"Downtown ABQ":"6:30A","Bernalillo Co.":"6:40A","Isleta Pueblo":"6:48A","Los Lunas":"6:59A","Belen":"7:09A"}},{"train":"#705","stops":{"Santa Fe Depot":"10:00A","South Capitol":"10:05A","Zia Road":"10:13A","Santa Fe Co. / NM 599":"10:22A","Kewa":"10:40A","Sandoval Co. / US 550":"11:02A","Downtown Bernalillo":"11:05A","Sandia Pueblo":"11:14A","Los Ranchos / JC":"11:19A","Montaño":"11:25A","Downtown ABQ":"11:35A","Bernalillo Co.":"11:45A","Isleta Pueblo":"11:53A","Los Lunas":"12:04P","Belen":"12:14P"}},{"train":"#709","stops":{"Santa Fe Depot":"3:05P","South Capitol":"3:10P","Zia Road":"3:18P","Santa Fe Co. / NM 599":"3:27P","Kewa":"3:45P","Sandoval Co. / US 550":"4:03P","Downtown Bernalillo":"4:06P","Sandia Pueblo":"4:17P","Los Ranchos / JC":"4:20P","Montaño":"4:26P","Downtown ABQ":"4:39P","Bernalillo Co.":"4:50P","Isleta Pueblo":"5:10P","Los Lunas":"5:20P","Belen":"5:30P"}},{"train":"#713","stops":{"Santa Fe Depot":"8:10P","South Capitol":"8:15P","Zia Road":"8:23P","Santa Fe Co. / NM 599":"8:32P","Kewa":"8:50P","Sandoval Co. / US 550":"9:11P","Downtown Bernalillo":"9:16P","Sandia Pueblo":"9:25P","Los Ranchos / JC":"9:30P","Montaño":"9:36P","Downtown ABQ":"9:46P","Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}},{"train":"#719","stops":{"Santa Fe Depot":"8:10P","South Capitol":"8:15P","Zia Road":"8:23P","Santa Fe Co. / NM 599":"8:32P","Kewa":"8:50P","Sandoval Co. / US 550":"9:11P","Downtown Bernalillo":"9:11P","Sandia Pueblo":null,"Los Ranchos / JC":null,"Montaño":null,"Downtown ABQ":null,"Bernalillo Co.":null,"Isleta Pueblo":null,"Los Lunas":null,"Belen":null}}]}}}};

function parseTime(timeStr) {
  if (!timeStr) return null;
  const match = timeStr.match(/^(\d{1,2}):(\d{2})(A|P)$/);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3];
  if (period === "P" && hours !== 12) hours += 12;
  if (period === "A" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function formatTime12(h, m) {
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${String(m).padStart(2, "0")} ${period}`;
}

function minutesDiff(departure, now) {
  let diff = departure - now;
  if (diff < 0) diff += 24 * 60;
  return diff;
}

function formatWait(mins) {
  if (mins < 1) return "Now";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function getTrainsForStation(station, direction, dayType, currentMinutes, isFriday) {
  let trainSets = [];
  if (dayType === "weekday") {
    trainSets = SCHEDULE.weekday[direction]?.trains || [];
  } else if (dayType === "saturday") {
    trainSets = SCHEDULE.weekend.saturday[direction]?.trains || [];
  } else {
    trainSets = SCHEDULE.weekend.sunday[direction]?.trains || [];
  }
  const results = [];
  for (const t of trainSets) {
    if (t.type === "friday_only" && !isFriday) continue;
    const timeStr = t.stops[station];
    if (!timeStr) continue;
    const depMin = parseTime(timeStr);
    if (depMin === null) continue;
    const wait = minutesDiff(depMin, currentMinutes);
    results.push({
      train: t.train,
      type: t.type,
      time: timeStr,
      departureMin: depMin,
      wait,
    });
  }
  results.sort((a, b) => a.wait - b.wait);
  return results;
}

function getDayType(date) {
  const day = date.getDay();
  if (day === 0) return "sunday";
  if (day === 6) return "saturday";
  return "weekday";
}

const ZONE_MAP = {
  "Belen": 4, "Los Lunas": 4, "Isleta Pueblo": 3,
  "Bernalillo Co.": 3, "Downtown ABQ": 2, "Montaño": 2,
  "Los Ranchos / JC": 2, "Sandia Pueblo": 2,
  "Downtown Bernalillo": 1, "Sandoval Co. / US 550": 1,
  "Kewa": 1, "Santa Fe Co. / NM 599": 1,
  "Zia Road": 0, "South Capitol": 0, "Santa Fe Depot": 0,
};

const BADGE_COLORS = {
  express: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  friday_only: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  regular: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" },
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function App() {
  const [station, setStation] = useState("Downtown ABQ");
  const [direction, setDirection] = useState("northbound");
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customHour, setCustomHour] = useState(8);
  const [customMin, setCustomMin] = useState(0);
  const [customDay, setCustomDay] = useState("weekday");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const currentMinutes = useMemo(() => {
    if (useCustomTime) return customHour * 60 + customMin;
    return now.getHours() * 60 + now.getMinutes();
  }, [useCustomTime, customHour, customMin, now]);

  const dayType = useMemo(() => {
    if (useCustomTime) return customDay;
    return getDayType(now);
  }, [useCustomTime, customDay, now]);

  const isFriday = useMemo(() => {
    if (useCustomTime) return customDay === "weekday";
    return now.getDay() === 5;
  }, [useCustomTime, customDay, now]);

  const trains = useMemo(() =>
    getTrainsForStation(station, direction, dayType, currentMinutes, isFriday),
    [station, direction, dayType, currentMinutes, isFriday]
  );

  const upcoming = trains.filter(t => t.wait <= 180);
  const later = trains.filter(t => t.wait > 180);

  const timeDisplay = useCustomTime
    ? formatTime12(customHour, customMin)
    : formatTime12(now.getHours(), now.getMinutes());

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 15h16M4 15l2 4h12l2-4M6 15V9a2 2 0 012-2h8a2 2 0 012 2v6M9 11h0M15 11h0"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Rail Runner</h1>
              <p className="text-xs text-gray-500">New Mexico Express</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {timeDisplay}
            </span>
            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 capitalize">
              {dayType === "weekday" ? `${DAY_NAMES[now.getDay()]}` : dayType}
              {useCustomTime && dayType === "weekday" && " (Weekday)"}
            </span>
          </div>
        </div>

        {/* Station Picker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Station</label>
          <select
            value={station}
            onChange={e => setStation(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-medium text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          >
            {SCHEDULE.stations.map(s => (
              <option key={s} value={s}>{s} (Zone {ZONE_MAP[s] + 1})</option>
            ))}
          </select>
        </div>

        {/* Direction Toggle */}
        <div className="flex gap-2 mb-4">
          {["northbound", "southbound"].map(dir => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                direction === dir
                  ? dir === "northbound"
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-sky-500 text-white shadow-md shadow-sky-200"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {dir === "northbound" ? "N " : "S "}
              {dir === "northbound" ? "To Santa Fe" : "To Belen"}
              {dir === "northbound" ? " \u2191" : " \u2193"}
            </button>
          ))}
        </div>

        {/* Custom Time */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Custom Time</label>
            <button
              onClick={() => setUseCustomTime(!useCustomTime)}
              className={`relative w-11 h-6 rounded-full transition-colors ${useCustomTime ? "bg-orange-500" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${useCustomTime ? "translate-x-5" : ""}`}/>
            </button>
          </div>
          {useCustomTime && (
            <div className="flex gap-3 mt-3">
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">Time</label>
                <input
                  type="time"
                  value={`${String(customHour).padStart(2, "0")}:${String(customMin).padStart(2, "0")}`}
                  onChange={e => {
                    const [h, m] = e.target.value.split(":").map(Number);
                    setCustomHour(h);
                    setCustomMin(m);
                  }}
                  className="w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">Day</label>
                <select
                  value={customDay}
                  onChange={e => setCustomDay(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="weekday">Weekday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {trains.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-4xl mb-3">🚂</div>
            <p className="text-gray-500 font-medium">No trains stop here</p>
            <p className="text-gray-400 text-sm mt-1">
              {direction === "northbound" ? "Northbound" : "Southbound"} on {dayType}s
            </p>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Next Departures</h2>
                <div className="space-y-2">
                  {upcoming.map((t, i) => (
                    <TrainCard key={t.train} train={t} isNext={i === 0} direction={direction} />
                  ))}
                </div>
              </div>
            )}
            {later.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Later Today</h2>
                <div className="space-y-2">
                  {later.map(t => (
                    <TrainCard key={t.train} train={t} isNext={false} direction={direction} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">Schedule effective {SCHEDULE.effective_date}</p>
      </div>
    </div>
  );
}

function TrainCard({ train, isNext, direction }) {
  const badge = BADGE_COLORS[train.type] || BADGE_COLORS.regular;
  const isNorth = direction === "northbound";

  return (
    <div className={`bg-white rounded-xl border p-4 transition-all ${
      isNext
        ? isNorth
          ? "border-orange-300 shadow-md shadow-orange-100 ring-1 ring-orange-200"
          : "border-sky-300 shadow-md shadow-sky-100 ring-1 ring-sky-200"
        : "border-gray-100 shadow-sm"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
            isNext
              ? isNorth
                ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                : "bg-gradient-to-br from-sky-500 to-sky-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>
            {train.train.replace("#", "")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{train.time.replace("A", " AM").replace("P", " PM")}</span>
              {train.type !== "regular" && (
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badge.bg} ${badge.text} ${badge.border}`}>
                  {train.type === "express" ? "Express" : "Fri Only"}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Train {train.train}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${
            isNext ? (train.wait <= 15 ? "text-green-600" : "text-orange-600") : "text-gray-500"
          }`}>
            {formatWait(train.wait)}
          </div>
          {isNext && train.wait <= 30 && (
            <span className="text-xs text-green-600 font-medium">Arriving soon</span>
          )}
        </div>
      </div>
    </div>
  );
}
