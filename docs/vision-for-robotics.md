---
title: Vision for Robotics
parent: Courses
layout: default
math: mathjax
---
# Vision for Robotics {#start}

- Table of Contents
{:toc}


![img-description]({{ site.baseurl }}/assets/images/Screenshot%20from%202025-03-01%2018-54-00.png)

## Motivation

Cameras have become one of the most accessible and data-rich sensors for robots, offering a wealth of visual information compared to traditional positioning or distance sensors. Advances in hardware and algorithms, such as RGB-D cameras and visual-inertial fusion techniques, have significantly improved robot perception. In navigation, robots use vision to detect obstacles, estimate trajectories, and build 3D maps of their environment. For grasping, visual data helps identify objects, estimate their pose, and determine how to interact with them. The following sections will explore the geometric foundations of 3D vision and its applications in robotic grasping.


## Ressources

### Books

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_32) (Chapter 32. 3-D Vision for Navigation and Grasping)

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_34) (Chapter 34. Visual Servoing)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/pose.html) (Chapter 4. Geometric Pose Estimation)

### Videos

- [Intro to Machine Vision and Robotics - part 1](https://www.youtube.com/watch?v=SVcOWYfsBkc)

- [Computer Vision](https://www.youtube.com/watch?v=DOf6ggQQ9ow&list=PLhwIOYE-ldwL6h-peJADfNm8bbO3GlKEy&index=1) (UC Berkley)

- [Multiple View Geometry - Lecture 1 (Prof. Daniel Cremers)](https://www.youtube.com/watch?v=RDkwklFGMfo&list=PLTBdjV_4f-EJn6udZ34tht9EVIW7lbeo4) (TU Munchen)
  
- [First Principles of Computer Vision](https://www.youtube.com/@firstprinciplesofcomputerv3258) (Youtube Channel)
  
### Free Online Courses

- [Vision Algorithms for Mobile Robotics](https://rpg.ifi.uzh.ch/teaching.html) (ETH)

- [Computer Vision](http://www.vision.rwth-aachen.de/course/11/) (RWTH Aachen)

## Chapter 0 : Introduction

![Intro to Machine Vision and Robotics - part 1](https://www.youtube.com/watch?v=SVcOWYfsBkc)

![Intro to Machine Vision and Robotics - part 2](https://www.youtube.com/watch?v=RS-MXFX0ehs&t=402s)

## Chapter 1: Geometric Vision {#chapter-1-vision}


<iframe src="{{ site.baseurl }}{{'/assets/pdfs/nav-vision.pdf'}}" width="100%" height="600px"></iframe>



(This chapter comes from the book *Springer Handbook of Robotics*, Chapter 32: 3-D Vision for Navigation and Grasping)



### Chapter 1.2 : Calibration

Camera calibration is the process of determining a camera’s intrinsic and extrinsic parameters to accurately map 3D world points to 2D image points. This step is crucial in computer vision, robotics, and augmented reality to correct distortions and enable accurate measurements.

Types of Camera Parameters :



| **Camera Parameters**  | **Description** | **Symbol** |
|------------------------|---------------|-----------|
| **Intrinsic Parameters** | Define the camera’s internal characteristics. | |
| Focal length          | Determines the scale of projection. | $ f $ |
| Principal point       | The optical center of the image. | $ (c_u, c_v) $ |
| Skew factor          | Accounts for potential shearing. | $ \beta $ |
| Aspect ratio         | Accounts for pixel shape differences. | $ \alpha $ |
| **Extrinsic Parameters** | Define the camera’s position and orientation in the world. | |
| Rotation matrix      | Describes the camera’s orientation. | $ R $ |
| Translation vector   | Specifies the camera’s position relative to a reference frame. | $ T $ |


![](https://www.youtube.com/watch?v=qByYk6JggQU&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=2)

![](https://www.youtube.com/watch?v=GUbWsXU1mac&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=3)

![](https://www.youtube.com/watch?v=2XM2Rb2pfyQ&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=4)

### Chapter 1.3 : Pose estimation or PNP

Pose estimation is the process of determining the position and orientation (pose) of a camera or object relative to a known reference frame, typically using 2D images and 3D world points. It plays a crucial role in robotics, augmented reality, and computer vision applications like object tracking, autonomous navigation, and grasping.

One common approach to pose estimation is the Perspective-n-Point (PnP) problem. Given a set of N known 3D points in the world and their corresponding 2D projections in an image, PnP estimates the camera’s position and orientation relative to the scene. This requires the camera to be calibrated, meaning its intrinsic parameters (such as focal length and optical center) are known.

![](https://www.youtube.com/watch?v=xdlLXEyCoJY)

![](https://www.youtube.com/watch?v=RR8WXL-kMzA)

#### Exercise

test

### Chapter 1.4 : Triangulation

See corresponding chapter in the PDF [*Springer Handbook of Robotics*](#chapter-1-vision)

Triangulation is a fundamental technique in computer vision and 3D reconstruction, used to determine the 3D coordinates of a point in the world from its projections in two or more images. By leveraging the known camera positions and the 2D image coordinates of a point, triangulation enables the estimation of the point’s location in 3D space.

In essence, triangulation involves using the principle of geometry to intersect the lines of sight from multiple camera views. By obtaining the corresponding points from two or more views and knowing the camera positions (extrinsic parameters) and their internal characteristics (intrinsic parameters), we can solve for the 3D coordinates of the point.

### Chapter 1.5 : Stereo Camera

![](https://www.youtube.com/watch?v=hUVyDabn1Mg&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=5)

![](https://www.youtube.com/watch?v=dUDMQ6dwWDA&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=6)

![](https://www.youtube.com/watch?v=v30I-BqGfuI&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=7)


### Chapter 1.6 : Structure from Motion

See corresponding chapter in the PDF [*Springer Handbook of Robotics*](#chapter-1-vision)

## Exercise

### Exercise 1

- Determine the Intrinsic Parameter Matrix (𝑲) of a digital camera with an image size 640×480 pixels and a horizontal field of view of 90°
- Assume square pixels and the principal point as the center of the diagonals
- What is the vertical field of view?
- What’s the projection on the image plane of $cP = [1, 1, 2]^T$

<details markdown="1">
  <summary>Solution</summary>

  ![img-description]({{ site.baseurl }}/assets/images/ex1_1.png)

  ![img-description]({{ site.baseurl }}/assets/images/ex1_2.png)

</details>


## Additional content

### Camera Notation Tutorial

<details markdown="1">
  <summary>See pdf</summary>

  <iframe src="{{ site.baseurl }}{{'/assets/pdfs/01_Camera_Notation_Tutorial.pdf'}}" width="100%" height="600px"></iframe>

</details>

### SVD for DLT

<details markdown="1">
  <summary>See pdf</summary>

  <iframe src="{{ site.baseurl }}{{'/assets/pdfs/02_SVD.pdf'}}" width="100%" height="600px"></iframe>

</details>


[Back to Top](#start)
