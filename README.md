# Performance Testing

## Project Overview

This README provides an overview of performance testing using Apache JMeter, a popular open-source tool for testing the performance of web applications, services, and APIs.
Performance testing involves evaluating how well a system performs under various conditions. 

JMeter empowers you to execute a diverse range of performance tests, encompassing Load Testing, Stress Testing, Spike Testing, and Endurance Testing. In this project, I have applied these tests to assess the performance of https://restful-booker.herokuapp.com/.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installing JMeter](#installing-jmeter)
3. [Creating a Test Plan](#creating-a-test-plan)
4. [Load Testing](#load-testing)
5. [Stress Testing](#stress-testing)
6. [Spike Testing](#spike-testing)
7. [Endurance Testing](#endurance-testing)
8. [CSV File](#csv-file)
9. [Feedback and Questions](#feedback-and-questions)

## Getting Started

Before you start performance testing with JMeter, make sure you have the following prerequisites:

- **Java**: JMeter is a Java-based tool, so you need to have Java installed on your machine. You can download Java from [java.com](https://www.java.com/).

- **JMeter**: Download the latest version of Apache JMeter from the [official website](https://jmeter.apache.org/download_jmeter.cgi).

## Installing JMeter

After downloading JMeter, follow these steps to install it:

1. Extract the downloaded JMeter archive to your preferred location.

2. Navigate to the JMeter `bin/` directory and run `jmeter.bat` (Windows) or `jmeter.sh` (Linux/Mac) to start the JMeter GUI.

## Creating a Test Plan

To create a performance test plan:

1. Launch JMeter as mentioned above.

2. In the JMeter GUI, create a new Test Plan by going to `File > New Test Plan`.

3. Add thread groups, samplers (HTTP Request for web applications, for example), and listeners (such as View Results Tree) to the test plan.

4. Configure the thread group to simulate user behavior, specifying the number of threads, ramp-up period, and loop count.

5. Configure the samplers to send requests to your target application's endpoints.

6. Add assertions to validate response data.

7. Configure listeners to capture and analyze test results.

## Load Testing

Load testing involves assessing how a system performs under expected loads. To perform load testing with JMeter:

Number of Threads 5100, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5100](https://github.com/rabeya19/Performance_Testing/assets/50509949/033bea0d-2f79-482c-af42-9b2c37e7e7eb) | ![error_5100](https://github.com/rabeya19/Performance_Testing/assets/50509949/caec0fcf-d868-4088-bc64-b58f327272bc)

Number of Threads 5200, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5200](https://github.com/rabeya19/Performance_Testing/assets/50509949/1cf9afb0-078d-4737-97c6-9118f1111064) | ![error_5200](https://github.com/rabeya19/Performance_Testing/assets/50509949/8ee21330-c011-4825-a143-8c190faafe86)

Number of Threads 5300, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5300](https://github.com/rabeya19/Performance_Testing/assets/50509949/f1af4822-b5eb-45c6-9ab0-b371b0d51eff) | ![error_5300](https://github.com/rabeya19/Performance_Testing/assets/50509949/25c77ac2-9a3b-422a-996a-b415a6cd051d)

Number of Threads 5400, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5400](https://github.com/rabeya19/Performance_Testing/assets/50509949/48217f8e-02df-4cf0-81e8-36c24d918213) | ![error_5400](https://github.com/rabeya19/Performance_Testing/assets/50509949/8e55bc01-64d5-4d3c-8a32-ad7de2c50da2)

Number of Threads 5500, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5500](https://github.com/rabeya19/Performance_Testing/assets/50509949/82ec1f22-6074-4000-bb1e-0cad73fefa75) | ![error_5500](https://github.com/rabeya19/Performance_Testing/assets/50509949/98f678f1-a921-48fc-8603-d90e0fc2d8ba)

Number of Threads 5600, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5600](https://github.com/rabeya19/Performance_Testing/assets/50509949/aa039022-e951-4cdd-a300-5e37e659881c) | ![error_5600](https://github.com/rabeya19/Performance_Testing/assets/50509949/01b2dd08-f4f9-436b-81a6-744cfaffbefb)

While executed 5400 concurrent request, found  82 request got connection timeout and error rate is 0.12%. 

Summary: Server can handle almost concurrent 5300 API call with almost zero (0) error rate.

## Stress Testing

Stress testing evaluates a system's stability by applying an excessive load. To perform stress testing with JMeter:

Number of Threads 5400, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5400](https://github.com/rabeya19/Performance_Testing/assets/50509949/48217f8e-02df-4cf0-81e8-36c24d918213) | ![error_5400](https://github.com/rabeya19/Performance_Testing/assets/50509949/8e55bc01-64d5-4d3c-8a32-ad7de2c50da2)

Number of Threads 5500, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5500](https://github.com/rabeya19/Performance_Testing/assets/50509949/82ec1f22-6074-4000-bb1e-0cad73fefa75) | ![error_5500](https://github.com/rabeya19/Performance_Testing/assets/50509949/98f678f1-a921-48fc-8603-d90e0fc2d8ba)

Number of Threads 5600, Ramp-up period is set to 10s with loop count of 1:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![graph_5600](https://github.com/rabeya19/Performance_Testing/assets/50509949/aa039022-e951-4cdd-a300-5e37e659881c) | ![error_5600](https://github.com/rabeya19/Performance_Testing/assets/50509949/01b2dd08-f4f9-436b-81a6-744cfaffbefb)

## Spike Testing

Spike testing assesses how a system handles sudden spikes in traffic. To perform spike testing with JMeter:
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
Number of Threads 6000, Ramp-up period is set to 10s with loop count of 1:
![spike_graph6000](https://github.com/rabeya19/Performance_Testing/assets/50509949/2c751f7e-e4ac-4afc-b6ec-29904a208823) | ![spike_error600](https://github.com/rabeya19/Performance_Testing/assets/50509949/8e0816dc-b113-4df5-8e52-2a12128b1204)

## Endurance Testing

Endurance testing evaluates system performance over an extended period. To perform endurance testing with JMeter:



## Read Test Data from CSV file

CSV files offer flexibility and simplicity for handling data, configurations, and results in your project with JMeter:

- Create a CSV file in the test suite folder and add test data to it:
  ![cseFile](https://github.com/rabeya19/Performance_Testing/assets/50509949/eb146f63-87a8-4e91-bc2d-e52711930743)
- Add a Config Element CSV Data Set Config in Jmeter:
  ![Csv](https://github.com/rabeya19/Performance_Testing/assets/50509949/22cff79a-5f4f-491e-ae39-9b90e3c19aae)
- Configure ' CSV Data Set Config ' based on the need such as providing path of CSV file and variable names and other configs:
![readCsv](https://github.com/rabeya19/Performance_Testing/assets/50509949/7b0d3d9c-0e10-4ce7-898c-f3fbbd103faf)
- Run the test to see if data from CSV file is read and populated in the results.

Number of Threads 4, Ramp-Up Period 10s with loop count 1:
:-------------------------:|:-------------------------:
![auth4](https://github.com/rabeya19/Performance_Testing/assets/50509949/f4e9819b-3b51-4300-a221-aa5571e49cfe) | ![auth1](https://github.com/rabeya19/Performance_Testing/assets/50509949/e0706e91-d7b7-405f-8b0c-87cc8e2a2538)
:-------------------------:|:-------------------------:
![auth2](https://github.com/rabeya19/Performance_Testing/assets/50509949/453a00f4-d685-49b5-840d-ff17f36413ab) | ![auth3](https://github.com/rabeya19/Performance_Testing/assets/50509949/d8082f25-c961-4e43-bcc2-c74dba8ffda3)


## Feedback and Questions

If you have any questions, need clarification, or wish to provide feedback on the testing process or this README, please feel free to reach out. Open and transparent communication is essential for maintaining product quality.
