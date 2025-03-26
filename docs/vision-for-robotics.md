---
title: Vision for Robotics
parent: Courses
layout: default
---
# Vision for Robotics {#start}

- Table of Contents
{:toc}


![img-description]({{ site.baseurl }}/assets/images/Vision/Vision_intro.png)

## Motivation

Cameras have become one of the most accessible and data-rich sensors for robots, offering a wealth of visual information compared to traditional positioning or distance sensors. Advances in hardware and algorithms, such as RGB-D cameras and visual-inertial fusion techniques, have significantly improved robot perception. In navigation, robots use vision to detect obstacles, estimate trajectories, and build 3D maps of their environment. For grasping, visual data helps identify objects, estimate their pose, and determine how to interact with them. The following sections will explore the geometric foundations of 3D vision and its applications in robotic grasping.


## Chapter 0 : Introduction
Welcome to this introduction on how a camera projects the three-dimensional (3D) world onto a two-dimensional (2D) image plane. We will discuss how to describe a point in 3D space with respect to a camera coordinate system and how these 3D points get projected into pixel coordinates on an image. We will then move on to intrinsic calibration and the issue of lens distortion.

By the end of this chapter, you should understand:

- How a 3D point is mapped to a 2D image (the pinhole camera model).

- How we define intrinsic and extrinsic camera parameters.

- How lens distortion can affect the image and how it is modeled.

We will keep the mathematical notation to a minimum but include enough details to grasp the core ideas. Small exercises are included to reinforce these concepts.

This course closely follows the Chapter 32: 3-D Vision for Navigation and Grasping from the book *Springer Handbook of Robotics*. Which can be read below.

<iframe src="{{ site.baseurl }}{{'/assets/pdfs/Vision/nav-vision.pdf'}}" width="100%" height="600px"></iframe>

Here are 2 introduction videos to help understand the core problem.

![Intro to Machine Vision and Robotics - part 1](https://www.youtube.com/watch?v=SVcOWYfsBkc)

![Intro to Machine Vision and Robotics - part 2](https://www.youtube.com/watch?v=RS-MXFX0ehs&t=402s)

## Chapter 1: Geometric Vision {#chapter-1-vision}

### Chapter 1.1: Camera and World Coordinate Systems 

Suppose there is a point in the real world, denoted as $(X,Y,Z)$. In order to describe how this point appears to a camera, we need to specify its location relative to the camera’s coordinate system. Usually, we place the camera coordinate system at its center of projection (roughly at the camera’s pinhole or main lens center) such that the $Z$-axis goes straight out from the camera (the optical axis).

#### Transforming From World Coordinates to Camera Coordinates

Let:

- $X_{world}=(X,Y,Z)^T$ be the coordinates of the point in the world’s coordinate system.

- $X_{ci}=(X_{ci},Y_{ci},Z_{ci})^T$ be the coordinates of the same point in the camera cici​’s coordinate system.

The two sets of coordinates are related by:

$$
\begin{bmatrix}
X_{ci} \cr
Y_{ci} \cr
Z_{ci}
\end{bmatrix} = R_i * 
\begin{bmatrix}
X \cr
Y \cr
Z
\end{bmatrix} + T_i,
$$

where:

- $R_i$ is a $3 \times 3$ *rotation matrix* describing how the axes of the world coordinate system relate to the camera’s axes. Because it’s a rotation matrix, $R_i^T R_i = I$ and $\det(R_i) = 1$.
- $T_i$ is a *translation vector* describing the shift from the camera’s origin to the world’s origin (or vice versa, depending on convention).

This transformation says:  
*“Take the point in world coordinates, rotate it so that the axes align with those of the camera, then translate it so the camera’s center is at the origin.”*


#### Projection Onto the Image Plane


In the classical pinhole camera model, we project a 3D point $X_{ci} = (X_{ci}, Y_{ci}, Z_{ci})$ onto a 2D image plane. Typically, we assume the image plane is at $Z_{ci} = 1$. (In reality, camera sensors sit behind the pinhole/center of projection by some distance, but mathematically it is simpler to place a plane in front.)

If $\mathbf{X}_{ci}$ lies in front of the camera, the *normalized* image coordinates $(x_i, y_i)$ (before going into actual pixel coordinates) are:

$$
x_i = \frac{X_{ci}}{Z_{ci}}, \quad
y_i = \frac{Y_{ci}}{Z_{ci}}.
$$

The quantities $x_i$ and $y_i$ are often called *normalized coordinates* because we have divided by $Z_{ci}$.

##### Intuitive Explanation

Think of rays of light traveling from the 3D point in the scene, through the camera center, to the image plane. The intersection of that ray with the image plane is how you figure out the 2D image location. Mathematically, it boils down to dividing by $Z_{ci}$ in the simplest pinhole model.



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

  ![img-description]({{ site.baseurl }}/assets/images/Vision/ex1_1.png)

  ![img-description]({{ site.baseurl }}/assets/images/Vision/ex1_2.png)

</details>


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


## Additional content

### Camera Notation Tutorial

<details markdown="1">
  <summary>See pdf</summary>

  <iframe src="{{ site.baseurl }}{{'/assets/pdfs/Vision/01_Camera_Notation_Tutorial.pdf'}}" width="100%" height="600px"></iframe>

</details>

### SVD for DLT

<details markdown="1">
  <summary>See pdf</summary>

  <iframe src="{{ site.baseurl }}{{'/assets/pdfs/Vision/02_SVD.pdf'}}" width="100%" height="600px"></iframe>

</details>


[Back to Top](#start)
