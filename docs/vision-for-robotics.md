---
title: Vision for Robotics
parent: Courses
layout: default
---

<!-- Link external JavaScript file -->
<script src="questions.js"></script>

# Vision for Robotics {#start}

- Table of Contents
{:toc}


## 1. Prerequisites
To get the most out of this Kinematics module, it’s helpful to have:

**Basic Mathematics**  
   - Familiarity with **trigonometry** (sine, cosine, angle addition formulas).  
   - Understanding of **linear algebra** (vectors, matrices, basic matrix operations).  
   - Comfort with **calculus** (especially differentiation).

While you don’t need to be an expert in any one of these areas, having a comfortable grasp of each will make your study of vision for robotics more productive and enjoyable.

## 2. General Motivation

Cameras have become one of the most accessible and data-rich sensors for robots, offering a wealth of visual information compared to traditional positioning or distance sensors. Advances in hardware and algorithms, such as RGB-D cameras and visual-inertial fusion techniques, have significantly improved robot perception. In navigation, robots use vision to detect obstacles, estimate trajectories, and build 3D maps of their environment. For grasping, visual data helps identify objects, estimate their pose, and determine how to interact with them. The following sections will explore the geometric foundations of 3D vision and its applications in robotic grasping.

## 3. Course Content

### Chapter 0 : Introduction
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

### Chapter 1: Geometric Vision {#chapter-1-vision}

**Camera and World Coordinate Systems**

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


  <p><strong>Question 1:</strong> The transformation from world coordinates to camera coordinates involves both a rotation and a translation.</p>
  <form id="q1">
    <input type="radio" name="q1" value="True"> True<br>
    <input type="radio" name="q1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1-feedback"></p>
  </form>

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

  <p><strong>Question 1:</strong> What does the matrix $R_i$​ represent in the transformation equation?</p>

  <form id="Q1.1.2">
    <input type="radio" name="Q1.1.2" value="1"> Scaling of the coordinates<br>
    <input type="radio" name="Q1.1.2" value="2"> Rotation to align the world axes with the camera axes<br>
    <input type="radio" name="Q1.1.2" value="3"> Translation from the world origin to the camera origin<br>
    <input type="radio" name="Q1.1.2" value="4"> Shearing of the coordinate system<br><br>

    <button type="button" onclick="checkMCQ('Q1.1.2', '2', 
      '✅ Correct!', 
      '❌ Incorrect. Try again!')">
      Check Answer
    </button>

    <p id="Q1.1.2-feedback"></p>
  </form>
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

  <p><strong>Question 1:</strong> The conversion from normalized coordinates to pixel coordinates involves intrinsic parameters such as the focal length, aspect ratio, skew factor, and the image center.</p>
  <form id="q1.1.1.1">
    <input type="radio" name="q1.1.1.1" value="True"> True<br>
    <input type="radio" name="q1.1.1.1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1.1.1.1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1.1.1.1-feedback"></p>
  </form>

<p><strong>Question 2:</strong> In the affine transformation ui=f α xi+β yi+cuui​=fαxi​+βyi​+cu​, which parameter determines the horizontal position of the image center?</p>

<form id="Q1.3.2">
  <input type="radio" name="Q1.3.2" value="1"> f<br>
  <input type="radio" name="Q1.3.2" value="2"> α<br>
  <input type="radio" name="Q1.3.2" value="3"> cu<br>
  <input type="radio" name="Q1.3.2" value="4"> β<br><br>

  <button type="button" onclick="checkMCQ('Q1.3.2', '3', 
    '✅ Correct!', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q1.3.2-feedback"></p>
</form>
</details>
---

#### **Lens Distortion**

Many practical camera systems, especially with wide-angle or fisheye lenses, introduce significant *radial distortion*. If you have ever seen lines near the edges of a photo curve outward (*"barrel distortion"*) or inward (*"pincushion distortion"*), that is due to lens imperfections.

![img-description]({{ site.baseurl }}/assets/images/Vision/Radial_distortion.png)

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

  <p><strong>Question 1:</strong> Radial lens distortion is modeled by applying a polynomial function to the normalized coordinates based on their distance from the image center.</p>
  <form id="q1.2.1">
    <input type="radio" name="q1.2.1" value="True"> True<br>
    <input type="radio" name="q1.2.1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1.2.1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1.2.1-feedback"></p>
  </form>


<p><strong>Question 2:</strong> In the context of lens distortion, what does the variable r represent?</p>

<form id="Q1.2.2">
  <input type="radio" name="Q1.2.2" value="1"> r is the ratio of xi​ and yi<br>
  <input type="radio" name="Q1.2.2" value="2"> r is the focal length in pixels<br>
  <input type="radio" name="Q1.2.2" value="3"> r is the radial distance from the image center, defined as xi2+yi2xi2​+yi2​<br>
  <input type="radio" name="Q1.2.2" value="4"> r is one of the distortion coefficients<br><br>

  <button type="button" onclick="checkMCQ('Q1.2.2', '3', 
    '✅ Correct!', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q1.2.2-feedback"></p>
</form>
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

  <p><strong>Question 1:</strong> A calibrated camera system requires knowing both its intrinsic parameters (e.g., focal length, skew, distortion coefficients) and its extrinsic parameters (e.g., rotation and translation relative to the world).</p>
  <form id="q1.3.1">
    <input type="radio" name="q1.3.1" value="True"> True<br>
    <input type="radio" name="q1.3.1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1.3.1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1.3.1-feedback"></p>
  </form>

<p><strong>Question 2:</strong> What is the main benefit of calibrating a camera system in the context of robotic vision?</p>

<form id="Q1.3.3">
  <input type="radio" name="Q1.3.3" value="1"> It allows the accurate mapping between 3D world coordinates and 2D pixel coordinates<br>
  <input type="radio" name="Q1.3.3" value="2"> It eliminates the need for a lens<br>
  <input type="radio" name="Q1.3.3" value="3">  It simplifies only the calculation of the rotation matrix​<br>
  <input type="radio" name="Q1.3.3" value="4"> It converts analog images to digital images<br><br>

  <button type="button" onclick="checkMCQ('Q1.3.3', '1', 
    '✅ Correct!', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q1.3.3-feedback"></p>
</form>
</details>
---

### Chapter 1.2 : Calibration

Camera **calibration** is the process by which we determine a camera’s **intrinsic** parameters (like focal length, principal point, and distortion coefficients) and **extrinsic** parameters (its position and orientation with respect to some world reference). A well-calibrated camera allows us to accurately map between real-world 3D coordinates and 2D image pixels, which is essential for tasks like navigation, 3D reconstruction, and robotic grasping.

As we saw in the previous sections, the pinhole camera model provides a neat mathematical description of how a point in 3D $(X,Y,Z)$ maps to a pixel coordinate $(u,v)$. However, real cameras have additional nuances:

- **Focal length and principal point** need to be estimated precisely (intrinsic calibration).

- **Lens distortion** can bend straight lines or enlarge/minimize certain regions (distortion calibration).

- **Camera pose** (rotation and translation) with respect to a world coordinate system may be unknown (extrinsic calibration).

**Calibration** is about figuring out all these parameters so that the projection model in your equations matches the actual camera you are using.

---

#### **Basic Setup: Intrinsic Calibration**

When the camera’s internal parameters remain constant (no zooming in/out) and you can take multiple images of a known reference pattern (e.g., a checkerboard), you can use common methods or toolboxes (e.g. the MATLAB Calibration Toolbox, Zhang’s OpenCV calibration functions) to recover the following:


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

After calibration, the hope is that for any future image, you can “correct” lens distortions and map each pixel to the corresponding ideal pinhole-ray direction.


<details markdown="1">
 <summary>Conceptual questions</summary>

  <p><strong>Question 1:</strong> What are the typical intrinsic parameters we aim to find when calibrating a camera?</p>

  <form id="Q2.1.1">
    <input type="radio" name="Q2.1.1" value="1"> The rotation and translation of the camera<br>
    <input type="radio" name="Q2.1.1" value="2"> The camera’s focal length, principal point, aspect ratio, skew, and distortion coefficients<br>
    <input type="radio" name="Q2.1.1" value="3"> The lens focal length only<br> 
    <input type="radio" name="Q2.1.1" value="4"> Only the radial distortion parameters<br><br>

  <button type="button" onclick="checkMCQ('Q2.1.1', '2', 
    '✅ Correct! Intrinsic calibration involves those parameters.', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q2.1.1-feedback"></p>
  </form>

  <p><strong>Question 2:</strong> During standard checkerboard-based calibration, we rely on known 3D positions (in the checkerboard reference) of the corners and their measured 2D positions in the images to solve for the camera’s intrinsic parameters.</p>

  <form id="Q2.1.2">
    <input type="radio" name="Q2.1.2" value="True"> True<br> 
    <input type="radio" name="Q2.1.2" value="False"> False<br> 
    
  <button type="button"
   onclick="checkTrueFalse('Q2.1.2', 'True',
    '✅ Correct!',
    '❌ Incorrect. Think about the standard procedure with known patterns.')"> Check Answer </button>
    <p id="Q2.1.2-feedback"></p>
    </form>
  </details>

---

#### **Varying Intrinsics and Self-Calibration**

Not all systems allow us to fix the camera intrinsics. For example, if the focal length can vary (zoom lenses) or if you cannot practically use a known reference pattern in the field, you might need more advanced methods:

- **Self-calibration** methods (such as the approach by Pollefeys et al.) rely on multiple views of unknown scenes. They track corresponding features across images and use constraints like the Kruppa equations to solve for the camera intrinsics and distortion.

- **Stratified self-calibration** typically requires at least three views and uses epipolar geometry and projective transformations to recover a consistent set of intrinsic parameters across all images.

These approaches can be more sensitive to noise or require many stable point correspondences, but they’re powerful in situations where you can’t do a “checkerboard session.”

---

#### **Projection Matrix Form and Depth Elimination**

Once we include lens distortion (and possibly correct it), the “ideal” pinhole mapping can be summarized in matrix form (assuming we now talk about undistorted, ideal pixel coordinates). Denote:

- $u_i = (u_i, v_i, 1)^T$ as the homogeneous pixel coordinate of a point in the $i$-th image.

- $X = (X, Y, Z, 1)^T$ as the homogeneous coordinate of a world point.

Then, for camera $i$, we have:
$$
λ_i u_i=K_i [R_i & T_i] X,
$$
where:

- $\lambda_i = Z_{ci}$ is the depth of the point relative to camera $i$,

- $K_i$ is the $3 \times 3$ matrix of intrinsic parameters,

- $R_i$ and $T_i$ describe the rotation and translation from the world coordinate system to camera $i$’s coordinate system,

- The product $\begin{bmatrix} R_i & T_i \end{bmatrix}$ is often called the extrinsic part.

Because $\lambda_i$ is just a scalar, you can rearrange or eliminate it, leading to two main equations that relate the world coordinates $X$ and the pixel coordinates $u_i$. These become the basis for solving calibration problems in practice.

---

#### **Key Takeaway:**

- Once you know $K_i$, $R_i$, and $T_i$, you can project any 3D point in the world straight into the 2D image.

- Calibration is about finding all those parameters so that 2D–3D correspondences match reality.

<details markdown="1">
 <summary>Conceptual questions</summary>

<p><strong>Question 1:</strong> If the matrix $K_i$ is unknown, how many different images of a known pattern are typically required to solve for these intrinsic parameters in a standard calibration method?</p>
<form id="Q2.2.1">
  <input type="radio" name="Q2.2.1" value="1"> Only one image<br>
  <input type="radio" name="Q2.2.1" value="2"> At least two images<br>
  <input type="radio" name="Q2.2.1" value="3"> At least three or more images at various angles<br> 
  <input type="radio" name="Q2.2.1" value="4"> It cannot be determined<br><br>

<button type="button" onclick="checkMCQ('Q2.2.1', '3', 
  '✅ Yes! Typically, you need multiple views (often >5) to reliably solve for intrinsic parameters.', 
  '❌ Think about the degrees of freedom and the need for diverse viewpoints!')">
  Check Answer
  </button>

  <p id="Q2.2.1-feedback"></p>

</form> </details>

<details markdown="1">
 <summary>Advanced Mathematical Development</summary>
![](https://www.youtube.com/watch?v=GUbWsXU1mac&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=3)

![](https://www.youtube.com/watch?v=2XM2Rb2pfyQ&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=4)

</details>

### Chapter 1.3 : Pose estimation or PNP

Once a camera is calibrated (i.e., we know its **intrinsic** parameters and can handle or correct for any lens distortion), we can tackle the problem of finding the camera’s **extrinsic** parameters (its rotation and translation) relative to known objects or landmarks in the world. This is often referred to as the **Pose Estimation** problem.

In many robotics tasks, we know the 3D coordinates of certain points in the environment (so-called landmarks or feature points) and we can detect their corresponding locations in the image. The goal is to solve for the camera’s exact position and orientation that makes those correspondences match the real world.

Here is a youtube video giving a short overview of the Pose estimation problem and how to resolve it

![](https://www.youtube.com/watch?v=xdlLXEyCoJY)

---

#### **The PnP (Perspective-n-Point) Problem**

Suppose you have:

- N known 3D points in the world:
  $X_j=(X_j, Y_j, Z_j)$
  $Xj​=(X_j​,Yj_​,Z_j​)$

- Their corresponding 2D points in the calibrated image:
  $xj=(x_j, y_j)$
  $xj​=(x_j​,y_j​)$

where the camera has already been calibrated, and any lens distortions are accounted for or removed. The **PnP** problem is to find a rotation matrix $R$ and a translation vector $T$ such that, for each 3D–2D match, the pinhole projection equation is satisfied:
$$
z_j \begin{bmatrix}
x_j \cr
y_j \cr
1
\end{bmatrix}
= K \begin{bmatrix}
R & T
\end{bmatrix}
\begin{bmatrix}
X_j \cr
Y_j \cr
Z_j \cr
1
\end{bmatrix},
$$

where $K$ is the intrinsic matrix and $z_j$​ is the point’s depth along the camera’s Z-axis. In simpler words:

>“Given N known 3D points and their 2D images, recover the camera’s orientation and position.”

---

#### **Minimal Example: 3 Points**

When only three world points are visible we are in the Perspective‑3‑Point (P3P) setting – the smallest data set that still lets us compute a full camera pose.

##### **Geometric Setup**

Define :


- $d_i = \|X_i - C\| \quad \text{(distance camera → point)}$


- $d_{ij} = \|X_i - X_j\| \quad \text{(known side lengths of the landmark triangle)}$


- $\cos \delta_{ij} = x_i^\top x_j \quad \text{(measured angle between image rays)}$

Because the rays and the segment $X_i X_j$ form a triangle, **the Law of Cosines** gives (for every $i \ne j$):

$$
d_i^2 + d_j^2 - 2 d_i d_j \cos \delta_{ij} = d_{ij}^2 \tag{1}
$$

There are *three* such equations — one per edge of the landmark triangle — and the *three unknowns* $d_1, d_2, d_3$.

![img-description]({{ site.baseurl }}/assets/images/Vision/p3p_geometry.png)

*Fig. 1  The 3-point pose-estimation problem. Unknown camera–point distances $d_1, d_2, d_3$ and known inter-point distances $d_{12}, d_{13}, d_{23}$. The angles $\delta_{ij}$ between bearing rays are measured in the image.*

##### **Reducing the Unknowns**

A classical trick (Gröbner-free) is to express two of the depths in terms of the first one:

$$
d_2 = u \, d_1, \quad d_3 = v \, d_1 \quad (u, v > 0).
$$

Insert those into (1) and divide by $d_1^2$:

$$
d_{12}^2 = d_1^2 \left( u^2 + 1 - 2u \cos \delta_{12} \right),
$$

$$
d_{13}^2 = d_1^2 \left( v^2 + 1 - 2v \cos \delta_{13} \right),
$$

$$
d_{23}^2 = d_1^2 \left( u^2 + v^2 - 2uv \cos \delta_{23} \right). \tag{2}
$$

Equation (2) immediately yields *three* expressions for the same $d_1^2$.  
Equating any two of them eliminates $d_1$ and leaves a system of **two quadratic equations** in the two variables $(u, v)$:

$$
d_{12}^2 \left( v^2 + 1 - 2v \cos \delta_{13} \right) = d_{13}^2 \left( u^2 + 1 - 2u \cos \delta_{12} \right),
$$

$$
d_{13}^2 \left( u^2 + v^2 - 2uv \cos \delta_{23} \right) = d_{23}^2 \left( v^2 + 1 - 2v \cos \delta_{13} \right). \tag{3}
$$

Now you need to: 

1. **Solve the second equation of (3) linearly for $u^2$.**

2. **Substitute** that expression into the first equation of (3).  
   The result is a single 4-th degree polynomial in $v$.

This 4-th degree polynomial can have up to **four real roots**.

For every admissible root $v$:

- compute $u$ from the quadratic substitution,
- recover $d_1, d_2, d_3$,
- keep only solutions where all depths are **positive** (points must be in front of the camera).

Because each quadratic step can produce two signs, you obtain at most **8 real pose candidates** – the well-known *P3P eight-fold ambiguity*.

##### **From Depths to $R$ and $T$**

Once $\{d_i\}$ are known, the 3-D coordinates of the landmarks **in the camera frame** are

$$
X_i^{\text{cam}} = d_i \, x_i.
$$

You now possess two 3-point sets:

| frame  | point 1 | point 2 | point 3 |
|--------|---------|---------|---------|
| World  | $X_1$   | $X_2$   | $X_3$   |
| Camera | $d_1 x_1$ | $d_2 x_2$ | $d_3 x_3$ |

Compute $R$, $T$ that best align the world set to the camera set.  
That is the classic **absolute orientation** problem and has a closed-form SVD solution (Horn 1987):

$$
\min_{R \in \text{SO}(3), \, T} \sum_{i=1}^{3} \left\| d_i x_i - (R X_i + T) \right\|^2.
$$

<details markdown="1">
  <summary>Additional content</summary>

  For a more thorough lecture on **pnp** you can watch the following youtube videos.

  Part 1:
  ![](https://www.youtube.com/watch?v=C5L7LnNL4oo)

  Part 2:
  ![](https://www.youtube.com/watch?v=8Nh1UeuD9-k)

  Part 3:
  ![](https://www.youtube.com/watch?v=9peph2zvSyY)

</details>

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
