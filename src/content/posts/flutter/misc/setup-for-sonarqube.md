---
title: Flutter, Code Static Analysis with SonarQube.
date: 2021-7-14
lang: en
status: published
link: https://dev.to/jamescardona11/flutter-code-static-analysis-with-sonarqube-3b39
summary: Sonarqube, like many similar tools, allows us to perform static code analysis, this will guide us to detect points of improvement.
---
This article will give you a brief introduction to an analysis tool for your code.
We will try to answer these questions: Why use sonarqube? How to install it?

- The Spanish version of this article: [Link](https://blog.jamescardona11.com/flutter-analisis-estatico-de-codigo-con-sonarqube)


<p align="center" width="100%">
<img src="https://i.imgur.com/mbHai0A.gif" width="400"/>
</p>


## Introduction
Sonarqube, like so many similar tools, allows us to perform static code analysis, this will guide us to detect points for improvement.

### Why use sonarqube?
It will help us to identify the things that we are doing good, and mainly the things that we are doing wrong.
Among the main uses, we can highlight the possibility of identifying aspects such as:
- duplicate code
- dead code
- coding standards
- unnecessary comments
- lack of unit tests and integration tests
- file size and methods
- spaghetti code
- vulnerabilities


### What information can sonarqube show us?
- **Quality Gate**: Rules that the analyzed project must comply with to pass the stage.
- **Bugs and Vulnerabilities**: Refers to actual or potential failures.
- **Code smells**: It is an indication that helps you with the writing of your code. It does not mean that you have any errors, it is just a suggestion to reduce the risk of errors.
- **Coverage**: It allows us to know how much code has been tested and validated by the tests.

## How to install and use it?

Let's see the steps to install it and integrate it into your developer day.

### Prerequisites:
- [Docker](https://docs.docker.com/get-docker)


### Setup and run sonarqube
1) Install sonarqube from **terminal** with the following command:
 ```docker pull sonarqube```
	
2) Run the **sonarqube** container, there are two ways to do it:

 - Using the following **command**
 ```
 docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 	sonarqube:latest
 ```
			
 If you download another version instead of *latest* change to the specific version.
 Important: remember the *--name* for later use.


 - The second way to do it, is using **docker app**, as shown in the following image:
 Important: remember the *name* for later use
	<p align="center" width="100%">
    <img src="https://i.imgur.com/Iygj8gT.png" width="600"/>
	</p>
	

3) Enter to **localhost:9000** to validate that everything it's running fine. You will see a section like the following image, the username and password is **admin**:
	<p align="center" width="100%">
    <img src="https://i.imgur.com/xnAez9L.png" width="600"/>
	</p>

4) We are going to install a plugin so we can be able to support the analysis in Flutter, 
 - Download from section **[releases](https://github.com/insideapp-oss/sonar-flutter)** the last version of the file **.jar**
 - We are going to copy the downloaded file using the **terminal** and then we are going to paste it into the docker container.
 - From the **docker** application we are going to execute the **cli** and then take the "**id-docker**" from the docker container as shown in the following images.
	<p align="center" width="100%">
    <img src="https://i.imgur.com/Bo4SMkd.png" width="600"/>
    <img src="https://i.imgur.com/hN3Ue7w.png" width="600"/>    
	</p>

 - Then you copy the **.jar** file to the docker container:
  ```docker cp file_path.jar id-docker:/opt/name/extensions/plugins```

 **file_path.jar**: path where you download the file **.jar**
        
 **id-docker**: id of the container obtained in the previous step
        
 **name**: container name. If you followed the tutorial without making changes, it is **sonarqube**

 - Check in the CLI console that you have the **.jar** file in the correct location
 - Reboot the docker container

5) Download the [**SonarScanner**](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)

 - Download the **.zip** file for your OS and set it as a system variable for your OS
 - Ex: On my Mac, 
  - Download and unzip in a folder called **tools** in $HOME
  - Then my bash/zsh configuration is as follows:  ```export PATH="$PATH":"$HOME/tools/sonar-scanner/bin"```

6) Let's go back to **localhost:9000**

7) Followed by that, create a project and choose the option **Manually**

8) Enter a key and name that you like

9) Enter a token for your project

10) Create a [configuration](https://github.com/insideapp-oss/sonar-flutter#project-configuration) file in your flutter project called: **sonar-project.properties**

 ```
 # Project identification
 sonar.projectKey=flutter_rocks
 sonar.projectName=Flutter Rocks
 sonar.projectVersion=1.0
		
 # Source code location.
 # Path is relative to the sonar-project.properties file. Defaults to .
 # Use commas to specify more than one folder.
 sonar.sources=lib
 sonar.tests=test

 # Encoding of the source code. Default is default system encoding.
 sonar.sourceEncoding=UTF-8

 # Allows reuse of an existing analyzer report
 # sonar.dart.analysis.reportPath=

 # Analyzer mode
 # Can be:
 # - flutter (flutter analyze) - default
 # - dart (dart analyze)
 # - legacy (dartanalyzer)
 # sonar.flutter.analyzer.mode= 
```
    
If you want to use your own linter analyzer add this:
 
 ```
 sonar.dart.analysis.useExistingOptions=true
 ```

</br>The **analysis_options.yaml** file already exists under the project root
    
11) Execute the command for your OS as indicated by the **SonarQube** console in the root of your project
	<p align="center" width="100%">
    <img src="https://i.imgur.com/zN4S6nt.png" width="600"/>
	</p>

 ```
 sonar-scanner \
 -Dsonar.projectKey=NAME \
 -Dsonar.sources=. \
 -Dsonar.host.url=http://localhost:9000 \
 -Dsonar.login=AuthenticationToken -X;  
 ```
    
    
12) Result: You can reload your **dashboard** to see all outputs
	<p align="center" width="100%">
    <img src="https://i.imgur.com/6ivPZnm.png" width="600"/>
    <img src="https://i.imgur.com/m3PTgHi.png" width="600"/>
	</p>
    

PD: If you get an error when Flutter is indexing the files in the test-folder, you can follow this [solution](https://stackoverflow.com/questions/29837369/cant-be-indexed-twice-testsourcedirectory-and-sourcedirectory-are-same/40150551#40150551)

```console
sonar.test.inclusions=**/*test*/**
sonar.exclusions=**/*test*/**
```

PD2: If you want to exclude **build_runner** classes, you can use the previous solution.

```console
sonar.exclusions=**/*.g.dart,**/*.gr.dart,**/*.freezed.dart
```


## Conclusion
**Sonarqube** can become an ally for projects where you have teams that require evaluating the quality of the code and taking a quality leap. It will allow you to create "rules" so that a team can keep up with customer expectations. It is still very crude for flutter and I think one of the following libraries may suffice.


**Static code analysis**, I think that in most cases it is enough to use one of these libraries: [Lint](https://pub.dev/packages/lint), [VeryGoodAnalysis](https://pub.dev/packages/very_good_analysis), [Pedantic](https://pub.dev/packages/pedantic)

---
The steps to run and install sonarqube are short. The thing that I wanted to achieve was to be as detailed as possible for people who are just starting and need a more detailed step-by-step.


Thanks to get here. <br/>
You can share this article to help other developers continue improving their productivity when writing applications with Flutter.


There's a Spanish version of this article on [hashnode](https://jamescardona11.hashnode.dev/flutter-analisis-estatico-de-codigo-con-sonarqube). You're welcome. 🇪🇸

See you in an upcoming Flutter article!!
<p align="center" width="100%">
<img src="https://i.imgur.com/q7fqQHS.gif" width="200"/>
</p>



### References:
- https://docs.sonarqube.org/latest/setup/get-started-2-minutes/
- https://hub.docker.com/_/sonarqube.
- https://docs.docker.com/engine/reference/commandline/cp/
- https://stackoverflow.com/questions/29837369/cant-be-indexed-twice-testsourcedirectory-and-sourcedirectory-are-same/40150551#40150551
- https://github.com/insideapp-oss/sonar-flutter