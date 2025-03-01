---
title: Vision for Robotics
parent: Courses
layout: default
math: mathjax
---
# Vision for Robotics

This section covers the principles and applications of vision in robotics, including:

- Image processing fundamentals
- Computer vision algorithms
- Feature extraction and object recognition
- 3D vision and depth perception
- Machine learning for vision

![img-description](/assets/images/Screenshot%20from%202025-03-01%2018-54-00.png)

## Motivation

Cameras have become one of the most accessible and data-rich sensors for robots, offering a wealth of visual information compared to traditional positioning or distance sensors. Advances in hardware and algorithms, such as RGB-D cameras and visual-inertial fusion techniques, have significantly improved robot perception. In navigation, robots use vision to detect obstacles, estimate trajectories, and build 3D maps of their environment. For grasping, visual data helps identify objects, estimate their pose, and determine how to interact with them. The following sections will explore the geometric foundations of 3D vision and its applications in robotic grasping.


## Chapter 1 : Geometric vision
(This chapter comes from the book Springer Handbook of Robotics, chapter32. 3-D Vision for Navigation and Grasping) 

Let us start by introducing the projection of the world to an image plane. Assume that a point in the world \((X, Y, Z)\) has coordinates \((X_{ci}, Y_{ci}, Z_{ci})\) with respect to the coordinate system of a camera \(c_i\), related to each other by the following transformation:

$$
\begin{pmatrix}
X_{ci} \\
Y_{ci} \\
Z_{ci} \\
1
\end{pmatrix}
=
R_i
\begin{pmatrix}
X \\
Y \\
Z \\
1
\end{pmatrix}
+ T_i \tag{32.1}
$$

where \(R_i\) is a rotation matrix whose columns are the world axes with respect to the camera. The translation vector \(T_i\) is starting from the origin of the camera and ending at the origin of the world coordinate system.

The rotation matrix is orthogonal, \(R^T R = I\), with determinant one. We assume that the center of projection is the origin of the coordinate system and that the optical axis is the \(Z_{ci}\) axis of the camera. If we assume that the image plane is the plane \(Z_{ci} = 1\), then the image coordinates \((x_i, y_i)\) are given by:

$$
x_i = \frac{X_{ci}}{Z_{ci}}, \quad y_i = \frac{Y_{ci}}{Z_{ci}} \tag{32.2}
$$

In practice, what we measure are the pixel coordinates \((u_i, v_i)\) in the image, which are related to the image coordinates \((x_i, y_i)\) with the affine transformation:

$$
u_i = f (\alpha x_i + \beta y_i + c_u), \quad v_i = f(y_i + c_v) \tag{32.3}
$$

where \(f\) is the distance of the image plane to the projection center measured in pixels. It is also called the focal length, because they are considered approximately equal. The aspect ratio \(\alpha\) is a scaling induced by nonsquare sensor cells or different sampling rates horizontally and vertically. The skew factor \(\beta\) accounts for a shearing induced by a nonperfectly frontal image plane. The image center \((c_u, c_v)\) is the point of intersection of the image plane with the optical axis, called the image center. These five parameters are called intrinsic parameters, and the process of recovering them is called intrinsic calibration. Upon recovering them, we can talk about a calibrated system, and we can work with the image coordinates \((x_i, y_i)\) instead of the pixel coordinates \((u_i, v_i)\).

In many vision systems, particularly on mobile robots, wide-angle lenses introduce a radial distortion around the image center, which can be modeled polynomially:

$$
x_{dist} = x_i \left(1 + k_1 r + k_2 r^2 + k_3 r^3 + \dots \right)
$$

$$
y_{dist} = y_i \left(1 + k_1 r + k_2 r^2 + k_3 r^3 + \dots \right)
$$

where \(r^2 = x_i^2 + y_i^2\), and we temporarily assume that the image center is at \((0, 0)\). The image coordinates \((x_i, y_i)\) in equation (32.3) should be replaced with the distorted coordinates \((x_{dist}, y_{dist})\).
