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

Here is a youtube video explaining in a visual way the content of this chapter
![](https://www.youtube.com/watch?v=qByYk6JggQU&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=2)

Suppose there is a point in the real world, denoted as $(X,Y,Z)$. In order to describe how this point appears to a camera, we need to specify its location relative to the camera’s coordinate system. Usually, we place the camera coordinate system at its center of projection (roughly at the camera’s pinhole or main lens center) such that the $Z$-axis goes straight out from the camera (the optical axis).

---

#### **Transforming From World Coordinates to Camera Coordinates**

Let:

- $X_{world}=(X,Y,Z)^T$ be the coordinates of the point in the world’s coordinate system.

- $X_{ci}=(X_{ci},Y_{ci},Z_{ci})^T$ be the coordinates of the same point in the camera $ci$​’s coordinate system.

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

<details markdown="1">
  <summary>Conceptual questions</summary>

  **Question 1** (True/False):
  True or False: The transformation from world coordinates to camera coordinates involves both a rotation and a translation.

</details>

---

#### **Projection Onto the Image Plane**


In the classical pinhole camera model, we project a 3D point $X_{ci} = (X_{ci}, Y_{ci}, Z_{ci})$ onto a 2D image plane. Typically, we assume the image plane is at $Z_{ci} = 1$. (In reality, camera sensors sit behind the pinhole/center of projection by some distance, but mathematically it is simpler to place a plane in front.)

If $\mathbf{X}_{ci}$ lies in front of the camera, the *normalized* image coordinates $(x_i, y_i)$ (before going into actual pixel coordinates) are:

$$
x_i = \frac{X_{ci}}{Z_{ci}}, \quad
y_i = \frac{Y_{ci}}{Z_{ci}}.
$$

The quantities $x_i$ and $y_i$ are often called *normalized coordinates* because we have divided by $Z_{ci}$.


>**Intuitive Explanation**
>Think of rays of light traveling from the 3D point in the scene, through the camera center, to the image plane. The intersection of that ray with the image plane is >how you figure out the 2D image location. Mathematically, it boils down to dividing by $Z_{ci}$ in the simplest pinhole model.

<details markdown="1">
  <summary>Conceptual questions</summary>
Question 1 (True/False):
True or False: The transformation from world coordinates to camera coordinates involves both a rotation and a translation.
Answer: True.

Question 2 (Multiple Choice):
What does the rotation matrix RiRi​ represent in the transformation equation?
A) Scaling of the coordinates
B) Rotation to align the world axes with the camera axes
C) Translation from the world origin to the camera origin
D) Shearing of the coordinate system
Answer: B.
</details>
---

#### **From Normalized Coordinates to Pixel Coordinates**

In a real camera, the image you get consists of pixels indexed by $(u_i, v_i)$. To bridge the gap between the continuous $(x_i, y_i)$ and discrete pixel $(u_i, v_i)$, we often use an affine transformation:

$$
u_i = f \, \alpha \, x_i + \beta \, y_i + c_u, \quad
v_i = f \, y_i + c_v.
$$

Let’s break down these parameters:

1. $f$: The focal length in pixels. It combines the physical focal length (in millimeters) and the sensor’s pixel size (in millimeters per pixel).

2. $\alpha$: The aspect ratio, allowing for rectangular (non-square) pixels or different horizontal vs. vertical sampling rates.

3. $\beta$: The skew factor. In an ideal camera, $\beta$ is zero. In real cameras where the sensor or read-out lines might be slightly tilted, $\beta$ can model that small shear.

4. $(c_u, c_v)$: The principal point, or image center. It is where the optical axis (the camera’s $Z$-axis) intersects the image plane, expressed in pixel coordinates.

These parameters are called the *intrinsic parameters* of the camera. Determining them precisely is known as **intrinsic calibration** (How to find them will be seen in the next chapter )
<details markdown="1">
  <summary>Conceptual questions</summary>

Question 1 (True/False):
True or False: The conversion from normalized coordinates to pixel coordinates involves intrinsic parameters such as the focal length, aspect ratio, skew factor, and the image center.
Answer: True.

Question 2 (Multiple Choice):
In the affine transformation ui=f α xi+β yi+cuui​=fαxi​+βyi​+cu​, which parameter determines the horizontal position of the image center?
A) ff
B) αα
C) cucu​
D) ββ
Answer: C.
</details>
---

#### **Lens Distortion**

Many practical camera systems, especially with wide-angle or fisheye lenses, introduce significant *radial distortion*. If you have ever seen lines near the edges of a photo curve outward (*"barrel distortion"*) or inward (*"pincushion distortion"*), that is due to lens imperfections.

A common way to model this is by adding polynomial correction terms that depend on $(r^2, r^4, r^6, \dots)$, where $r^2 = x_i^2 + y_i^2$. Thus, the distorted coordinates $(x_i^{\text{dist}}, y_i^{\text{dist}})$ become something like:

$$
x_i^{\text{dist}} = x_i \left(1 + k_1 r^2 + k_2 r^4 + k_3 r^6 + \dots \right),
$$

$$
y_i^{\text{dist}} = y_i \left(1 + k_1 r^2 + k_2 r^4 + k_3 r^6 + \dots \right).
$$

The coefficients $k_1, k_2, k_3, \dots$ are additional parameters to be calibrated, especially for wide-angle lenses.

<details markdown="1">
  <summary>Conceptual questions</summary>
Question 1 (True/False):
True or False: Radial lens distortion is modeled by applying a polynomial function to the normalized coordinates based on their distance from the image center.
Answer: True.

Question 2 (Multiple Choice):
In the context of lens distortion, what does the variable rr represent?
A) rr is the ratio of xixi​ and yiyi​
B) rr is the focal length in pixels
C) rr is the radial distance from the image center, defined as xi2+yi2xi2​+yi2​
​
D) rr is one of the distortion coefficients
Answer: C.
</details>
---

#### **Putting It All Together: Calibrated Systems**

When we say a system is *calibrated*, it typically means:

1. We know the *intrinsic parameters* ($f, \alpha, \beta, c_u, c_v, k_1, k_2, \dots$).

2. We know how the camera is positioned in some *external* coordinate system (its rotation $R_i$ and translation $T_i$), known as the *extrinsic* parameters.

Once we have done an intrinsic calibration (which can be done using a checkerboard pattern or known calibration target) and accounted for distortion, we can confidently map between:

- 3D coordinates $\boldsymbol{X}_{ci}$ in the camera’s frame
- 2D pixel measurements $(u_i, v_i)$

This is critical for many robotic tasks such as *navigation*, *obstacle avoidance*, *object tracking*, and *grasping*, since everything eventually must go from real-world distances and geometry to image pixel coordinates.

<details markdown="1">
  <summary>Conceptual questions</summary>
Question 1 (True/False):
True or False: A calibrated camera system requires knowing both its intrinsic parameters (e.g., focal length, skew, distortion coefficients) and its extrinsic parameters (e.g., rotation and translation relative to the world).
Answer: True.

Question 2 (Multiple Choice):
What is the main benefit of calibrating a camera system in the context of robotic vision?
A) It allows the accurate mapping between 3D world coordinates and 2D pixel coordinates
B) It eliminates the need for a lens
C) It simplifies only the calculation of the rotation matrix
D) It converts analog images to digital images
Answer: A.
</details>
---

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
