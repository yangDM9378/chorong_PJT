# 팀명 : VIP

<br />

# 📢 초롱따라



## 🏆 프로젝트 소개
 

[개요]  

[기간] 

[팀원]  

[소속] 

[성과] 

<br />



## 🏷 기획의도


<br />



## 🛠️ 기술 스택 및 환경


BackEnd
- Springboot 2.7.9
- Java 11
- Gradle 7.6.1
- Mysql 8.0.32

FrontEnd
- Node 16.18.0
- OpenVidu

CI/CD
- AWS EC2 (Ubuntu 20.04 LTS)
- Docker 23.0.1
- Jenkins 2.387.1
- nginx/1.18.0 

협업
- Git
- Jira
- notion
- Mattermost

<br />



## 💻 아키텍처

<br />




## 📋 요구사항 명세서

<br />




## ✔️ ERD
<img src="/uploads/ff4890edd9045f401596e3993b154ad5/초롱따라_erd.png"  width="695" height="842"/>


<br />




## 📁 프로젝트 폴더 구조

#### BackEnd
```
├─.gradle
│  ├─7.6.1
│  │  ├─checksums
│  │  ├─dependencies-accessors
│  │  ├─executionHistory
│  │  ├─fileChanges
│  │  ├─fileHashes
│  │  └─vcsMetadata
│  ├─buildOutputCleanup
│  └─vcs-1
├─.idea
├─gradle
│  └─wrapper
└─src
    ├─main
    │  ├─java
    │  │  └─com
    │  │      └─ssafy
    │  │          └─chorongddara
    │  │              ├─api
    │  │              │  ├─controller
    │  │              │  ├─dto
    │  │              │  ├─request
    │  │              │  ├─response
    │  │              │  └─service
    │  │              ├─common
    │  │              │  ├─codes
    │  │              │  ├─exception
    │  │              │  ├─model
    │  │              │  ├─response
    │  │              │  └─util
    │  │              ├─config
    │  │              │  ├─AuthenticationEntryPoint
    │  │              │  ├─filter
    │  │              │  ├─handler
    │  │              │  └─oauth2
    |  │              │     ├─cookie
    |  │              │     ├─handler
    |  │              │     └─userinfo
    │  │              └─db
    │  │                 ├─entity
    │  │                 └─repository
    │  └─resources
    └─test
        └─java
            └─com
                └─ssafy
                    └─chorongddara
                        └─quiz

```

#### FrontEnd
```
├─deploy_conf
├─public
│  ├─img
│  │  ├─background
│  │  ├─clock
│  │  ├─picture
│  │  └─word
│  ├─info
│  ├─main
│  └─modal
└─src
    ├─api
    ├─audio
    ├─components
    │  ├─common
    │  ├─home
    │  ├─Info
    │  ├─mypage
    │  │  ├─ChangeForm
    │  │  ├─deleteAccount
    │  │  ├─student
    │  │  │  ├─calender
    │  │  │  ├─myinfo
    │  │  │  └─result
    │  │  └─therapist
    │  │      ├─manage
    │  │      └─myinfo
    │  ├─navbar
    │  ├─onClass
    │  │  ├─evaluation
    │  │  └─game
    │  ├─openvidu
    │  │  ├─makeroom
    │  │  ├─student
    │  │  └─therapist
    │  ├─program
    │  ├─scroll
    │  └─user
    │      ├─findid
    │      ├─findpw
    │      ├─signin
    │      └─signup
    ├─context
    ├─hooks
    │  └─queries
    ├─libs
    └─pages
        ├─common
        ├─mypage
        ├─onClass
        ├─program
        │  ├─clock
        │  ├─picture
        │  └─word
        └─user
```



<br />




## ⭐ 주요 기능 소개

#### 1️⃣ 포즈 인식     




<br />




    
 




