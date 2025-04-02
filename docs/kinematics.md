---
title: Kinematics
parent: Courses
layout: default
math: mathjax
---

<!-- Link external JavaScript file -->
<script src="questions.js"></script>

# Kinematics

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1. Prerequisites
To get the most out of this Kinematics module, it’s helpful to have:

1. **Basic Mathematics**  
   - Familiarity with **trigonometry** (sine, cosine, angle addition formulas).  
   - Understanding of **linear algebra** (vectors, matrices, basic matrix operations).  
   - Comfort with **calculus** (especially differentiation), which is useful for topics like velocity kinematics and the Jacobian.

2. **Fundamental Physics or Mechanics**  
   - Basic concepts of **rigid-body motion** (translational and rotational movement).  
   - General understanding of **forces** and **torques** can be helpful, though kinematics itself does not address them directly.

While you don’t need to be an expert in any one of these areas, having a comfortable grasp of each will make your study of kinematics more productive and enjoyable.


## 2. General Motivation

![Delta Robot Pick and Place](https://www.youtube.com/watch?v=8j5hPlHTZI8)

Have you ever watched a precision robot—like the Delta robot in the video—pick and place objects at incredible speed and accuracy? These agile machines seem are well known for their fluidity and precision. But behind the impressive motion lies a well-structured branch of mechanics called **kinematics**.

Kinematics, often referred to as the “**geometry of movement**,” is the study of *how bodies move in space without considering the forces or torques causing the motion*. By focusing on the geometry and arrangement of joints, links, and end-effectors, kinematics allows us to:

- Predict and Control Robot Positions: From assembly lines to surgical suites, robots must position their end-effectors at **exact points in space**. Kinematics equations provide the road map, telling us how each joint angle translates into a specific position and orientation.

- Design Efficient Mechanisms: Whether it’s a Delta robot on a factory floor or a humanoid robot in a research lab, well-planned kinematic structures enable robots to work **faster**, with better range of motion and fewer mechanical constraints.

- Streamline Path Planning: From pick-and-place tasks to drawing complex shapes, kinematics helps in **calculating paths**, ensuring the robot can move smoothly from one point to another without collisions or awkward joint motions.

In this chapter, you’ll explore different ways of representing positions and orientations in 3D space, understand the kinematics behind common robotic joints, and learn a systematic way to map your robot’s geometry into the equations that bring the entire mechanism to life. By mastering kinematics, you’ll have a strong foundation for making robots move **precisely** and **reliably**, unlocking a world of innovative possibilities.


## 3. Course Content
This section of the course is primarily based on content shared by **Mohammad Zainullah Khan**, an engineer with a Master’s degree in Mechanical Engineering (specializing in robotics, design, and mechatronics) from the University of Dayton. You can find more information on his website: [www.zainullah.com](https://www.zainullah.com/).

Mohammad’s videos are **well-structured**, **visually engaging** and **not very long** (less than 10 minute), making them an excellent resource for anyone beginning to study kinematics for robotics. We recommend starting with the videos listed below to build a solid foundation. 

Once you’ve grasped the basics, you can further strengthen your understanding by working through both pen-and-paper exercises and coding tasks. These hands-on activities will help you verify that you have truly mastered the core concepts.

But before we start to watch videos let's check some basic notions, defintions that could be useful:

<!-- Conceputal questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>



<!-- First question  -->
<p><strong>Question 1: A serial robot is a closed kinematic chain structure</strong></p>
<form id="q1">
  <input type="radio" name="q1" value="True"> True<br>
  <input type="radio" name="q1" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q1', 'False', 
      'Correct! A serial robot has an open kinematic chain structure.',
      'Incorrect. A serial robot is an open kinematic chain, not closed.')">
    Check Answer
  </button>
  <p id="q1-feedback"></p>
</form>

<!-- Second question  -->
<p><strong>Question 2: In general, a parallel robot is more rigid than a serial robot</strong></p>
<form id="q2">
  <input type="radio" name="q2" value="True"> True<br>
  <input type="radio" name="q2" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q2', 'True', 
      'Correct! ',
      'Incorrect. Refer to the definition of parallel and serial robot')">
    Check Answer
  </button>
  <p id="q2-feedback"></p>
</form>

<!-- Third question  -->
<p><strong>Question 3: A parallel robot is a structure characterized by a closed kinematic loop</strong></p>
<form id="q3">
  <input type="radio" name="q3" value="True"> True<br>
  <input type="radio" name="q3" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q3', 'True', 
      'Correct!',
      'Incorrect.')">
    Check Answer
  </button>
  <p id="q3-feedback"></p>
</form>

<!-- Fourth question  -->
<p><strong>Question 4: Answer the following questions based on the robot structures shown below:</strong></p>
![Robot_Structures]({{ site.baseurl }}/assets/images/kinematics/ex1_1.png)

---

<p><strong>1\. How many motors does each robot have?</strong></p>

<p><strong>(a)</strong></p> Stäubli TX60:

<form id="q1a-motors">
  <input type="radio" name="q1a-motors" value="4"> 4 motors<br>
  <input type="radio" name="q1a-motors" value="5"> 5 motors<br>
  <input type="radio" name="q1a-motors" value="6"> 6 motors<br><br>

  <button type="button" onclick="checkMCQ('q1a-motors', '6', 
    'Correct! The Stäubli TX60 has 6 motorized joints (RRR handler + RRR wrist).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q1a-motors-feedback"></p>
</form>

**(b)** Second robot:

<form id="q1b-motors">
  <input type="radio" name="q1b-motors" value="3"> 3 motors<br>
  <input type="radio" name="q1b-motors" value="5"> 5 motors<br>
  <input type="radio" name="q1b-motors" value="6"> 6 motors<br><br>

  <button type="button" onclick="checkMCQ('q1b-motors', '5', 
    'Correct! The second robot has 5 motorized joints (RTT handler + RR wrist).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q1b-motors-feedback"></p>
</form>

---

**2\. What is the Mobility (MO) of each robot?**

**(a)** Stäubli TX60:

<form id="q2a-mo">
  <input type="radio" name="q2a-mo" value="4"> 4<br>
  <input type="radio" name="q2a-mo" value="5"> 5<br>
  <input type="radio" name="q2a-mo" value="6"> 6<br><br>

  <button type="button" onclick="checkMCQ('q2a-mo', '6', 
    'Correct! Mobility (MO) equals the number of motors (6).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q2a-mo-feedback"></p>
</form>

**(b)** Second robot:

<form id="q2b-mo">
  <input type="radio" name="q2b-mo" value="3"> 3<br>
  <input type="radio" name="q2b-mo" value="5"> 5<br>
  <input type="radio" name="q2b-mo" value="6"> 6<br><br>

  <button type="button" onclick="checkMCQ('q2b-mo', '5', 
    'Correct! Mobility (MO) equals the number of motors (5).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q2b-mo-feedback"></p>
</form>

---

**3\. What is the number of Degrees of Freedom (DOF) for each robot?**

**(a)** Stäubli TX60:

<form id="q3a-dof">
  <input type="radio" name="q3a-dof" value="3"> 3 DOF (translations only)<br>
  <input type="radio" name="q3a-dof" value="5"> 5 DOF (3 translations + 2 rotations)<br>
  <input type="radio" name="q3a-dof" value="6"> 6 DOF (3 translations + 3 rotations)<br><br>

  <button type="button" onclick="checkMCQ('q3a-dof', '6', 
    'Correct! Stäubli TX60 has 6 DOF (3 translations + 3 rotations).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q3a-dof-feedback"></p>
</form>

**(b)** Second robot:

<form id="q3b-dof">
  <input type="radio" name="q3b-dof" value="3"> 3 DOF (translations only)<br>
  <input type="radio" name="q3b-dof" value="5"> 5 DOF (3 translations + 2 rotations)<br>
  <input type="radio" name="q3b-dof" value="6"> 6 DOF (3 translations + 3 rotations)<br><br>

  <button type="button" onclick="checkMCQ('q3b-dof', '5', 
    'Correct! The second robot has 5 DOF (3 translations + 2 rotations).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q3b-dof-feedback"></p>
</form>


</details>


### Chapter 0 : Introduction to Robotics | Kinematics & Modeling

This video gives you an introduction of the meaning of kineamtics and modeling and will present you how his videos will be strucured.
![Robotics 101: Full course for beginners](https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA)

<!-- Conceputal questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- First question  -->
<p><strong>Question 1: How long are Mohammad's videos typically?</strong></p>
<form id="q1-duration">
  <input type="radio" name="q1-duration" value="10"> Less than 10 minutes<br>
  <input type="radio" name="q1" value="30"> Around 30 minutes<br>
  <input type="radio" name="q1" value="60"> Around 1 hour<br>

  <button type="button" onclick="checkMCQ('q1', '10', 
    'Correct! Mohammad’s videos usually last less than 10 minutes.', 
    'Incorrect. Try again!')">
    Check Answer
  </button>
  <p id="q1-feedback"></p>
</form>

<!-- Second question  -->
<p><strong>Question 2: Forward kinematics (FK) is...</strong></p>
<form id="q2">
  <input type="radio" name="q2" value="option1"> How to calculate the position/orientation from given joint variables<br>
  <input type="radio" name="q2" value="option2"> Finding joint variables from end-effector position and orientation<br>
  <input type="radio" name="q2" value="option3"> Calculating robot dynamics<br>

  <button type="button" onclick="checkMCQ('q2', 'option1',
    'Correct! Forward Kinematics computes the position and orientation from joint variables.',
    'Incorrect. Please try again!')">
    Check Answer
  </button>

  <p id="q2-feedback"></p>
</form>

</details>


### Chapter 1: Coordinate Transformations in 2D | Mapping {#chapter-1-coordinate-transformations-in-2D}

In this chapter, we focus on 2D coordinate transformations—specifically, pure translations and pure rotations for planar (serial) robots.

An introduction to 2D translations and rotations:
![Coordinate Transformations in 2D : Mapping Part 1](https://www.youtube.com/watch?v=H_94DTWd8ck&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=2)

Explains how translations and rotations combine simultaneously:
![Coordinate Transformations in 2D : Mapping Part 2](https://www.youtube.com/watch?v=TWTMoFvcBFc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=3)

Discusses how to handle successive coordinate transformations step by step:
![Coordinate Transformations in 2D : Mapping Part 3](https://www.youtube.com/watch?v=R_hxO5xBYfI&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=4)

As you've seen, a **general motion in the plane** can be described by a combination of translations and rotations around the origin. A sequence of translations and rotations comes up against the fact that the translation is a vector addition while the rotation a matrix multiplication.

It would be very desirable to be able to integrate rotation and translation in a single operation in order to be able to link them together. The **homogeneous matrices** allow this integration of the translation into the transformation matrix. The price to pay is to increase the order of the matrix by one. The translation vector t is added to the right and a line [0 0 1] at the bottom:

$$
\begin{bmatrix}
    R & \mathbf{t} \cr
    0 & 1 
\end{bmatrix} = 
\begin{bmatrix}
    \cos \theta & -\sin \theta & t_x  \cr
    \sin \theta & \cos \theta  & t_y  \cr
    0           & 0            & 1 
\end{bmatrix}
$$

This is **the homogeneous matrix** of transformation in a two‐dimensional space (a plane), the third line has no spatial significance (no z axis for the moment !!). This matrix acts on a **homogeneous vector** in a two‐dimensional space which consists of its two coordinates plus a "scale factor" equal to one:
$$
\mathbf{v} =
\begin{bmatrix}
x \cr
y \cr
1
\end{bmatrix}.
$$   

To find the familiar vectors, just delete the last element. Matrices and homogeneous vectors for three dimensions contain four elements.

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Is the following equality true?</strong></p>
<p>R(θ<sub>1</sub>) · R(θ<sub>2</sub>) = R(θ<sub>2</sub>) · R(θ<sub>1</sub>)</p>
<form id="eq-commutative">
  <input type="radio" name="eq-commutative" value="true"> True<br>
  <input type="radio" name="eq-commutative" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'eq-commutative', 
    'true', 
    'Correct! R(θ₁)·R(θ₂)=R(θ₁+θ₂)=R(θ₂+θ₁)=R(θ₂)·R(θ₁).', 
    'Incorrect. Rotation matrices commute in 2D rotations.'
  )">
    Check Answer
  </button>

  <p id="eq-commutative-feedback"></p>
</form>

<!-- Second question  -->
<p><strong>Question 2: The matrix 
  <p>\[
  \begin{bmatrix}
  c & -s & t_x \\
  s & c & t_y \\
  0 & 0 & 1
  \end{bmatrix}
  \]</p> correspond to ...</strong></p>
<form id="matrix-order">
  <input type="radio" name="matrix-order" value="option1"> A translation followed by a rotation<br>
  <input type="radio" name="matrix-order" value="option2"> A rotation followed by a translation<br>

  <button type="button" onclick="checkMCQ(
    'matrix-order', 
    'option2', 
    'Correct! This matrix represents a rotation followed by a translation (proved in mathematical development).',
    'Incorrect. Please try again!'
  )">
    Check Answer
  </button>

  <p id="matrix-order-feedback"></p>
</form>

</details>

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: </strong> Express the homogeneous transformation matrix representing a rotation by angle θ followed by translation \( t = (t_x, t_y) \) in a 2D plane.</p>

  <details markdown="2">
    <summary>Answer Q1</summary>
    $
    \begin{aligned}
    M_t \cdot M_r &= \begin{bmatrix}
    1 & 0 & t_x \\
    0 & 1 & t_y \\
    0 & 0 & 1
    \end{bmatrix} \cdot
    \begin{bmatrix}
    \cos\theta & -\sin\theta & 0 \\
    \sin\theta & \cos\theta & 0 \\
    0 & 0 & 1
    \end{bmatrix} &=
    \begin{bmatrix}
    \cos\theta & -\sin\theta & t_x \\
    \sin\theta & \cos\theta & t_y \\
    0 & 0 & 1
    \end{bmatrix}
    = 
    \begin{bmatrix}
    R(\theta) & t \\
    0 & 1
    \end{bmatrix}
    \quad\text{where}\quad
    R(\theta) = 
    \begin{bmatrix}
    \cos\theta & -\sin\theta \\
    \sin\theta & \cos\theta
    \end{bmatrix}
    \end{aligned}
    $
  </details>


</details>



### Chapter 2: Forward Kinematics of robots | Planar 2D robots


In robotics, understanding how each joint movement translates into precise actions is essential. In this chapter, we'll dive into [forward kinematics](#forward-and-inverse-kinematics) (also called Direct Geometric Model, DGM), a fundamental method that allows us to calculate exactly where a robot’s end-effector (such as a gripper or tool) ends up in space based on its joint configurations (for example its position (x,y) and orientation(θ) in 2D). We'll start by exploring simple planar 2D robots, laying a clear foundation for mastering more complex robotic systems.

Watch the following video for an intuitive overview before we delve into the mathematical details.

![Forward Kinematics of robots](https://www.youtube.com/watch?v=svyhLDAoyKc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=5)



### Chapter 3: Forward Kinematics (with solved examples) | Homogeneous Transformations 

Here you will see some examples of how to find this end effector positions in 2D using homogeneous transforms as we have seen in Chapter 1. 

![examples](https://www.youtube.com/watch?v=mO7JJxaVtkE&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=6)

![examples2](https://www.youtube.com/watch?v=zg5sS9LZGAM&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=7)

Now that we've seen how to compute forward kinematics using homogeneous transformations, let's explore **another insightful way** to approach planar rotations. Sometimes, it's more intuitive or practical to represent motion as rotation around an **arbitrary point \( p \)** rather than just around the origin.

A rotation around an arbitrary point \( p \) can be expressed through three intuitive steps:

1. **Translate** the point \( p \) to the origin.
2. **Rotate** around the origin by angle \(θ\).
3. **Translate back** by moving the origin back to point \( p \).

Mathematically, this can be represented as:

$
\begin{bmatrix}
    I & p \cr
    0 & 1 
\end{bmatrix} \cdot
\begin{bmatrix}
    R & 0 \cr
    0 & 1 
\end{bmatrix} \cdot
\begin{bmatrix}
    I & -p \cr
    0 & 1 
\end{bmatrix} = 
\begin{bmatrix}
    R & p - R \cdot p \cr
    0 & 1 
\end{bmatrix}
$

This expression clearly shows that:

- **A rotation about any point \( p \)** is equivalent to **a rotation about the origin**, followed by a particular translation \( p - R p \).
- Conversely, **any combination of rotation and translation** in the plane can be represented as a pure rotation around a certain center \( p \).

Understanding this concept is powerful because it provides deeper insight into robot movements, especially when dealing with practical scenarios involving complex rotations or articulations around joints positioned away from the base.

Let's get familiriar with this type of method doing similar exercise:

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions v2</summary>

Practice what you've learned with Exercises **1**,**2** and **3**.


<iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_4_1-3.pdf'}}" width="100%" height="600px"></iframe>

<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
<iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_4_1-3.pdf'}}" width="100%" height="600px"></iframe>
</details>

</details>


<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: </strong> In this exercise you will work on the geometric model of the SCARA robot. Here we won't consider the rotation of the end effector. The output point will be the point P at the extremity of the second segment L2 (see figure). Give the direct geometric model (DGM) that expresses the coordinates (x, y) of point P as a function of the joint coordinates \( q_1 \) and \( q_2 \).</p>

<p>
Hint: use the homogeneous matrices of the following transformations:
1. Rotation of \( q_2 \) around P_{10} with coordinates (\( L_1 \) , 0)
2. Rotation of \( q_1 \) around the origin
</p>

![examples]({{ site.baseurl }}/assets/images/kinematics/dgm.png)

  <details markdown="2">
  <summary>Answer Q1</summary>

  <p>To obtain the <strong>direct geometric model</strong> that expresses the coordinates \((x, y)\) of the end effector \( P \) as a function of the joint coordinates \( q_1 \) and \( q_2 \), we follow these steps:  </p>

  <p>
  1. <strong>Reference Position:</strong>  
    First, we position the robot in its reference configuration (see the figure below).  
    Then, we develop the homogeneous transformation matrices at each joint, starting from the last one.
  </p>

  ![dgm_correction]({{ site.baseurl }}/assets/images/kinematics/dgm_correction.png)
  <!-- ![examples](/assets/images/kinematics/dgm_correction.png) -->

  <p>
  2. <strong>Homogeneous Matrices for Each Joint:</strong>  
    - Homogeneous matrix corresponding to the rotation \( q_2 \) around the point \( P_{10} \) with coordinates \((L_1, 0)\).  
    - Homogeneous matrix corresponding to the rotation \( q_1 \) around the origin. 
  </p> 

  <p>
  3. <strong>Final Transformation:</strong>  
    The direct geometric model is obtained by multiplying the sequence of homogeneous matrices, starting  
    with the last transformation and moving towards the first, as explained in the lecture.  
  </p>
  
  <strong>Homogeneous Transformation for Rotation Around an Arbitrary Point</strong>  

  <p>The general form of a homogeneous transformation matrix for a rotation around an arbitrary point \( p \) is: 
  </p>

  
  H = 
  $
  \begin{bmatrix}
      R & p - R \cdot p \\
      0 & 1 
  \end{bmatrix}
  $

  <p>
  Using this relation, we calculate the homogeneous matrix \( H_2 \), which corresponds to the rotation by \( q_2 \)  
  around the point \( P_{10} \) with coordinates \((L_1, 0)\):</p>

  
  \( H_2 \) = 
  $
  \begin{bmatrix}
      R_2 & p_{10} - R_2 \cdot p_{10} \cr
      0 & 1 
  \end{bmatrix}
  $

  where:

  $
  p_{10} - R_2 \cdot p_{10} =
  \begin{bmatrix}
      L_1 \cr
      0
  \end{bmatrix}
  -
  \begin{bmatrix}
      c_2 & -s_2 \cr
      s_2 & c_2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
      L_1 \cr
      0
  \end{bmatrix}
  = \begin{bmatrix}
      L_1 - c_2 \cdot L_1 \cr
      -s_2 \cdot L_1
  \end{bmatrix}
  =
  \begin{bmatrix}
      L_1 \cdot v_2 \cr
      -L_1 \cdot s_2
  \end{bmatrix}
  $
  

  The homogeneous matrix \( H_1 \), which corresponds to the rotation by \( q_1 \) around the origin is expressed as follows:

  \( H_1 \) = 
  $
  \begin{bmatrix}
      R_1 & 0 \cdot p \cr
      0 & 1 
  \end{bmatrix}
  $


  The combined homogenous matrix of the sequence of the two rotations, respectively represented by the homogenous matrix \( H_2 \) (of angle \( q_2 \)) then \( H_1 \) (of angle \( q_1 \) ), is equal to the following product: 

  $
  H = H_1 \cdot H_2 =
  \begin{bmatrix}
      c_1 & -s_1 & 0 \cr
      s_1 & c_1 & 0 \cr
      0 & 0 & 1
  \end{bmatrix} \cdot
  \begin{bmatrix}
      c_2 & -s_2 & L_1 v_2 \cr
      s_2 & c_2 & -L_1 s_2 \cr
      0 & 0 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
      c_{1+2} & -s_{1+2} & L_1 (c_1 v_2 + s_1 s_2) \cr
      s_{1+2} & c_{1+2} & L_1 (s_1 v_2 - c_1 s_2) \cr
      0 & 0 & 1
  \end{bmatrix}
  $

  To find the coordinates \((x, y)\) of the point \( P \) (which is the Tool Center Point), we proceed as follows:

  $
  \begin{bmatrix}
      x \cr
      y \cr
      1
  \end{bmatrix} = H \cdot P_{20}
  $

  Thus, applying the homogeneous transformation matrix to \( P_{20} \):

  $
  \begin{bmatrix}
      x \cr
      y \cr
      1
  \end{bmatrix}
  = H \cdot
  \begin{bmatrix}
      L_{12} \cr
      0 \cr
      1
  \end{bmatrix}
  $

  Using the previously computed homogeneous matrix, this results in:

  $
  \begin{bmatrix}
      x \cr
      y \cr
      1
  \end{bmatrix} = \begin{bmatrix}
      L_1 c_1 + L_2 c_{1+2} \cr
      L_1 s_1 + L_2 s_{1+2} \cr
      1
  \end{bmatrix}
  $

  This final equation gives the direct geometric model expressing the position of the tool center point \( P \) in terms of the link lengths and joint angles.

  </details>



</details>


### Chapter 4: Collision Detection using Homogeneous Transforms  

In this chapter, we’ll explore how **collision detection** between robots can be performed using homogeneous transformations. Specifically, you’ll compute a new homogeneous transformation matrix that describes the relationship between two end-effectors, given two separate transformation matrices ($H_1$ and $H_2$). This new matrix will provide the relative distances $d_x$ and $d_y$ between the two end-effectors. When both $d_x$ and $d_y$ become zero, it indicates that the two robots are in collision.


Watch the following video to see this concept illustrated clearly:

![Homogeneous Transforms](https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=8)

### Chapter 5: Inverse Kinematics of Robots
<!-- 
Inversly as the forward kinematics, inverse kinematics (also called Indirect Geometric Model, IGM) allow us to find the values of the joint positions given the position and orientation of the end-effector relative to the base and the values of all the geometric link parameters. -->

Inverse Kinematics (IK), also known as the **Indirect Geometric Model (IGM)**, allows us to determine the required joint positions (angles and link lengths) based on the desired position and orientation of the robot's end-effector, given the geometric parameters of its links. This process is essentially the opposite of forward kinematics.

**What exactly is Inverse Kinematics, and how can we use it to move a robot from point A to point B?**  
IK is one of the most intriguing and broadly used concepts in robotics. Simply put, inverse kinematics involves calculating the robot’s joint parameters (such as angles and link lengths) to position its end-effector precisely at a specified location and orientation.

If you have a solid understanding of forward kinematics, inverse kinematics becomes straightforward and intuitive.

Watch the following video for a clear introduction to inverse kinematics:

![Inverse Kinematics of Robots](https://www.youtube.com/watch?v=1-FJhmey7vk&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=9)

In this next video, you will explore another example of inverse kinematics using a planar robot. Interestingly, this robot features both revolute and prismatic joints, making its parameters a combination of joint angles and link lengths. This type of robot is specifically known as an **'RRP' robot**.

![example_inverse_kinematics](https://www.youtube.com/watch?v=EzZDRwmk8Nw&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=10)


<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Inverse kinematics gives position and orientation of the end-effector in function of joint angles</strong></p>
<form id="inv-kin">
  <input type="radio" name="inv-kin" value="true"> True<br>
  <input type="radio" name="inv-kin" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'inv-kin', 
    'false', 
    'Correct!', 
    'Incorrect. It is the definition of direct kinematics.'
  )">
    Check Answer
  </button>

  <p id="inv-kin-feedback"></p>
</form>

</details>

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: </strong> Find the IGM (Inverse geometric model) of a 2DOF planar robot (see figure below): given x and y, what are \(θ_1\) and \(θ_2\)?</p>

$
x = L_1 \cos{\theta_1} + L_2 \cos{(\theta_1 + \theta_2)}
$

$
y = L_1 \sin{\theta_1} + L_2 \sin{(\theta_1 + \theta_2)}
$

<p>
Hint : use the trigonometric formulas for the sine
and cosine of the sum of two angles, as well as the
one of the sum of squares of sine and cosine.
</p>

![examples]({{ site.baseurl }}/assets/images/kinematics/inv.png)


<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
<iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_4_3.pdf'}}" width="100%" height="600px"></iframe>
</details>

</details>

### Chapter 6: Velocity Kinematics - Meet the Jacobian !

Ready to dive deeper into robotics? This chapter introduces you to one of the coolest concepts in robot motion: the **Jacobian Matrix**! 

Ever wondered how quickly and smoothly a robot's gripper moves in space? Here you'll learn exactly how to calculate both the linear and angular velocities of a robot's end-effector. But that's not all—the Jacobian acts like a map , converting **joint velocities** into precise **end-effector movements**. Mastering it means you're unlocking a powerful tool that robotics experts use every day!

Watch the following video to get an understanding of velocity kinematics and the powerful Jacobian matrix:

![Velocity Kinematics & Jacobian Matrix](https://www.youtube.com/watch?v=Wud3aCXiSm8&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=11)

And there's even more! Discover how the Jacobian connects to the fascinating world of **Manipulability Ellipsoids**, showing you visually how robots move, avoid obstacles, and perform complex tasks efficiently.

Check it this video here:
![Velocity Kinematics & Manipulability Ellipsoids](https://www.youtube.com/watch?v=gdSTcJwf3L0&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=12)

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: The Jacobian matrix of a robot related the joint positions with the joint torques</strong></p>
<form id="jac">
  <input type="radio" name="jac" value="true"> True<br>
  <input type="radio" name="jac" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'jac', 
    'false', 
    'Correct!', 
    'Incorrect. See next question'
  )">
    Check Answer
  </button>

  <p id="jac-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: The Jacobian matrix of a robot relates the position at the level of the tool woth the articular positions</strong></p>
<form id="jac2">
  <input type="radio" name="jac2" value="true"> True<br>
  <input type="radio" name="jac2" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'jac2', 
    'false', 
    'Correct!', 
    'Incorrect.'
  )">
    Check Answer
  </button>

  <p id="jac2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: The Jacobian matrix of a robot relates the force applied to the level of the tool with the joint torques</strong></p>
<form id="jac3">
  <input type="radio" name="jac3" value="true"> True<br>
  <input type="radio" name="jac3" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'jac3', 
    'true', 
    'Correct!', 
    'Incorrect.'
  )">
    Check Answer
  </button>

  <p id="jac3-feedback"></p>
</form>

</details>

Now that you've understood the exciting concept of the Jacobian, let's practice calculating it ourselves! Follow along with this detailed solved example in the video below, and then reinforce your skills with some hands-on exercises. Give it a try! 

![how to find Jacobian Matrix](https://www.youtube.com/watch?v=EdvAHmIONMs&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=13)


<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

Practice what you've learned with Exercises **1** and **2** below.
*(Note: Exercise 2.8 on finding singularities will be introduced in the next video.)*


<iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_5.pdf'}}" width="100%" height="600px"></iframe>

<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
<iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_5.pdf'}}" width="100%" height="600px"></iframe>
</details>

</details>


### Chapter 7: Robot Singularities & how to find them

Singularities occur when a robot configuration causes it to lose the ability to move or become blocked in certain directions. Understanding and identifying these singularities is essential to safe and efficient robot operation.

Watch the video below to clearly grasp what robot singularities are and how you can find them:

![Robot Singularities & how to find them](https://www.youtube.com/watch?v=WXEOr7X2bPE&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=14)

For *serial manipulators*, the singular positions result from the l**oss of degrees of freedom** while in a *parallel manipulator*, they result of the **gain of one or more degrees of freedom**. Most of the time, passing through a singularity causes **over constraint**, to then inducing the loss of control of one or more degrees of freedom. Which means, not controllable, which is not good. 

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What condition must be satisfied to identify a robot's singularity ? det(J) = ...</strong></p>
<form id="q1-sing">
  <input type="radio" name="q1-sing" value="I"> Identity Matrix<br>
  <input type="radio" name="q1-sing" value="0"> 0<br>
  <input type="radio" name="q1-sing" value="non0"> Non-zero value<br>

  <button type="button" onclick="checkMCQ('q1-sing', '0', 
    'Correct! The determinant det(J) must equal 0 to identify singularities.', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q1-sing-feedback"></p>
</form>

<!-- Question 2 -->
**Question 2:** Consider the following Delta robot:

![Delta robot]({{ site.baseurl }}/assets/images/kinematics/delta_robot.png)

Which of the following diagrams represent singularities of this Delta robot? *(Multiple answers possible)*

![Singularities of Delta robot]({{ site.baseurl }}/assets/images/kinematics/delta_robot_sing.png)

<form id="q2-sing">
  <input type="checkbox" name="q2-sing" value="a"> <strong>a)</strong> When the 6 bars (3 pairs) are all parallel in the same direction<br>
  <input type="checkbox" name="q2-sing" value="b"> <strong>b)</strong> When 4 bars (2 pairs) are parallel<br>
  <input type="checkbox" name="q2-sing" value="c"> <strong>c)</strong> When 4 bars (2 pairs) lie in the same plane or two parallel planes<br>
  <input type="checkbox" name="q2-sing" value="d"> <strong>d)</strong> When the 3 parallelograms are arranged in three parallel or coincident planes<br><br>

  <button type="button" onclick="checkMultipleAnswers('q2-sing', ['a', 'b', 'c', 'd'], 
    'Correct! All four diagrams represent singularities of the Delta robot.<br><br>
    <ul>
      <li><strong>(a)</strong> The nacelle (platform connected by 6 bars) moves on a spherical surface and undesirably rotates around the vertical axis.</li>
      <li><strong>(b)</strong> The nacelle retains only one degree of freedom, allowing movement along an arc of a circle.</li>
      <li><strong>(c)</strong> The nacelle has one degree of freedom, rotating around the axis connecting the joints between the nacelle and the other two bars.</li>
      <li><strong>(d)</strong> The nacelle acquires three degrees of freedom: two undesired rotations around horizontal axes within its plane, and a small translation perpendicular to that plane.</li>
    </ul>
    ', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q2-sing-feedback"></p>
</form>




</details>


<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

Now, you can apply what you've learned by solving **Exercise 2.8** from the previous exercise set !

</details>

<!-- 
## Exercises

### Pen & Paper Exercises

#### Exercise 1:
For the following structures:
![examples]({{ site.baseurl }}/assets/images/kinematics/ex1_1.png)

What is the: 
1. Number of motors? 
2. Mobility (MO)? 
3. Number of degrees of freedom (DOF)?

<details markdown="1">
  <summary>Solution</summary>

  **Reminder:** The mobility of a serial robot is always equal to its number of motors. All the joints of a serial robot are actuated (motorized).  

  1. **(a)** The Stäubli TX60 has 6 motorized joints: RRR for the handler and RRR for the wrist.  
     **(b)** The second robot has 5 motorized joints: RTT for the handler and RR for the wrist.  

  2. **(a)** Stäubli TX60: MO = 6.  
     **(b)** Second robot: MO = 5.  

  3. **(a)** Stäubli TX60: DOF = 6; three translations of the tool and three rotations in the space of the tool.  
     **(b)** Second robot: DOF = 5; three translations of the tool and two rotations in the space of the tool.  

</details>

### Coding Exercises
These exercises will help you practice the fundamental concepts of kinematics by translating them into Python code. You can run these snippets in a local Python environment or online in services like Google Colab, Jupyter Notebook, or similar platforms.

---

## 1. Forward Kinematics of a 2-Link Planar Manipulator

**Objective:**  
Write a function that computes the end-effector position (x, y) of a 2-link planar robot arm given two joint angles $\theta_1$ and $\theta_2$.

**Robot Description:**  
- Link 1 has length $L_1$.  
- Link 2 has length $L_2$.  
- Joint angles $\theta_1$ and $\theta_2$ are measured from the x-axis (or from the previous link’s axis).

**Kinematic Equations:**  
$
\begin{aligned}
    x &= L_1 \cos(\theta_1) + L_2 \cos(\theta_1 + \theta_2) \\
    y &= L_1 \sin(\theta_1) + L_2 \sin(\theta_1 + \theta_2)
\end{aligned}
$

**Instructions:**  
1. Define a Python function called `forward_kinematics_2link(theta1, theta2, L1, L2)` that returns `(x, y)`.  
2. Test your function with different angle values to see if the outputs make sense.

```python
def forward_kinematics_2link(theta1, theta2, L1, L2):
    """
    Calculate the (x, y) position of the end-effector of a 2-link planar robot arm.
    
    Parameters:
    - theta1: angle of the first joint (in radians)
    - theta2: angle of the second joint (in radians)
    - L1: length of the first link
    - L2: length of the second link
    
    Returns:
    - (x, y): A tuple containing the x and y coordinates of the end-effector
    """
    import math
    
    x = L1 * math.cos(theta1) + L2 * math.cos(theta1 + theta2)
    y = L1 * math.sin(theta1) + L2 * math.sin(theta1 + theta2)
    
    return (x, y)

# Example usage:
if __name__ == "__main__":
    # Let's assume each link is 1 meter long:
    L1, L2 = 1.0, 1.0
    
    # Test the function with some angle values (in radians)
    angles = [
        (0.0, 0.0),
        (math.pi/4, math.pi/4),
        (math.pi/2, 0.0),
        (math.pi/3, -math.pi/6)
    ]
    
    for (t1, t2) in angles:
        x, y = forward_kinematics_2link(t1, t2, L1, L2)
        print(f"Theta1={t1:.2f}, Theta2={t2:.2f} => (x={x:.2f}, y={y:.2f})")
```


## Key Definitions and Concepts in Kinematics

Below is a set of definitions and concepts that will help you navigate the topics in this chapter on Kinematics. Some are foundational from trigonometry, and others relate specifically to robotics and the modeling of mechanical structures. Feel free to reference these as you study.

### Degrees of Freedom (DoF)
The **number of degrees of freedom** is the number of independent variables (or coordinates) needed to define the configuration of a system.  
- *Example:* A free rigid body in 3D has 6 DoF (3 translational + 3 rotational).

#### Mobility of a Kinematic Structure  
Often denoted as \( MO \), mobility is equivalent to the total DoF of the structure. If you have \( n \) independent rigid bodies in free space (before assembling them with joints), they collectively have \( 6n \) DoF in 3D space (each body can move in 3 translational and 3 rotational dimensions).

---

### Types of Kinematic Chains and Mechanisms

#### Serial Chain  
A sequence of rigid links where each link is connected to the next by a joint, except for the first and last link, which each have only one connection.  
- *Example:* A typical robotic arm, where each segment is attached end-to-end.

#### Fully Parallel Mechanism  
A mechanism in which two links (often the base and the end-effector) are connected by multiple independent chains.  
- *Example:* The Delta robot, where the end-effector is connected to the base by several parallel arms.

#### Tree Structure  
A structure similar to a serial chain but can branch out. Each link can have multiple “child” links, forming a tree. A serial chain is a special case of a tree with no branching.

---

### Common Joint Types

- **Revolute (R)** — Rotational motion around a fixed axis (e.g., a hinge).  
- **Prismatic (P)** — Translational motion along a single axis (sliding joint).  
- **Helical (H)** — Combined rotation and translation along the same axis (like a screw).  
- **Cylindrical (C)** — A combination of one rotational DoF and one prismatic DoF about/along the same axis.  
- **Planar** — Allows motion in a plane, typically two translational DoF and one rotational DoF.  

---

### Homogeneous Transformations

#### Rotation/Translation Representation  

A **homogeneous transformation** matrix represents both rotation and translation in a $4\times4$ matrix form. For example, a rotation about the $z$-axis by an angle $ \Theta $ is given by:  

$$
\text{Rot}(z, \theta) = 
\begin{bmatrix}
    \cos \theta & -\sin \theta & 0 & 0 \\
    \sin \theta & \cos \theta  & 0 & 0 \\
    0           & 0            & 1 & 0 \\
    0           & 0            & 0 & 1
\end{bmatrix}
$$  

Homogeneous transformations are fundamental in describing the position and orientation of each link and the end-effector in robotics.

---

### Constraints in Robotic Mechanisms

#### Holonomic Constraints  
Constraints that can be written purely in terms of **position variables** (joint angles, link displacements). For instance, most standard joints (revolute, prismatic, etc.) impose constraints that do not require velocities or accelerations in the equations. The number of constraint equations is $6 - n$, where $ n $ is the DoF of the joint.

#### Nonholonomic Constraints  
Constraints that **cannot** be expressed solely in terms of the position variables. They involve **time derivatives** of those variables and cannot be integrated to yield a relationship only between the joint coordinates.  
- *Example:* The rolling constraints of wheeled mobile robots (no slipping/skidding).

---

<h2 id="forward-and-inverse-kinematics"> Forward and Inverse Kinematics:

#### Direct (Forward) Geometric Model (DGM)  
Also called **forward kinematics**, it provides the **position and orientation** of the robot’s end-effector as a function of the robot’s joint variables $ \Theta $. Formally:

$$
\mathbf{T}_{\text{end-effector}} = f(\Theta)
$$

where $ \Theta $ can include both rotational and prismatic joint variables.

- **Serial Robots**  
  For serial robots, the DGM generally has **a single unique solution** for a given set of joint variables (i.e., one specific end-effector pose).

- **Parallel Robots**  
  For parallel robots, the DGM can have **multiple solutions** (often called “contortions”) for a given set of joint variables.

#### Inverse Geometric Model (IGM)  
Also called **inverse kinematics**, it is the inverse problem: given a desired position and orientation of the end-effector, find the **joint variables** that achieve it. Formally:

$$
\Theta = f^{-1}(\mathbf{T}_{\text{desired}})
$$

This can have multiple solutions (or no solutions) depending on the robot’s geometry.

- **Serial Robots**  
  The IGM for serial robots may have **several solutions** or sometimes no solution at all, depending on the desired pose.

- **Parallel Robots**  
  The IGM for parallel robots typically has **a single unique solution**, in contrast to serial mechanisms.

#### Jacobian  
The **Jacobian matrix** describes how a small change in the joint variables translates to a change in the end-effector’s **velocity** (or differential displacement). It is crucial for understanding robot motion, detecting singularities, and implementing control algorithms.

---

### Additional Useful Terms 

- **Workspace** — The set of all points (and orientations) that the end-effector can reach. It can be subdivided into the **reachable workspace** (positions the end-effector can physically attain) and the **dexterous workspace** (positions the end-effector can reach with all orientations).
- **Singularity** — A configuration where the robot loses certain motion capabilities (the Jacobian becomes rank-deficient). In these positions, small changes in joint angles can result in large or unpredictable changes in the end-effector pose—or no movement in certain directions at all.

---

## Useful Formulas for Robotic Kinematics

### Grubler’s Formula (General Form in 3D)

Also known as Kutzbach criterion, it gives the mobility $ MO $ of a mechanism with $ n $ rigid bodies connected by $ k $ joints:

$$
MO = 6 \times (n - k) + \sum_{i=1}^{k} (\text{MO}_i),
$$

where $\text{MO}_i$ is the contribution to mobility from the $ i $-th joint (often the joint’s DoF).

> **Note:** Variations of this formula exist depending on whether you consider closed chains, higher-pair joints, and other special constraints.

---

### Rotation Matrices About Principal Axes
- **Rotation about the x-axis by $\alpha$**  

    $$
    R_x(\alpha) = 
    \begin{bmatrix}
        1 & 0 & 0 \\
        0 & \cos \alpha & -\sin \alpha \\
        0 & \sin \alpha & \cos \alpha
    \end{bmatrix}
    $$

- **Rotation about the y-axis by $\beta$**  

    $$
    R_y(\beta) = 
    \begin{bmatrix}
        \cos \beta & 0 & \sin \beta \\
        0 & 1 & 0 \\
        -\sin \beta & 0 & \cos \beta
    \end{bmatrix}
    $$

- **Rotation about the z-axis by $\gamma$**  

    $$
    R_z(\gamma) = 
    \begin{bmatrix}
        \cos \gamma & -\sin \gamma & 0 \\
        \sin \gamma & \cos \gamma & 0 \\
        0 & 0 & 1
    \end{bmatrix}
    $$

Any 3D rotation can be expressed as a product of these fundamental rotations.


Quaternions provide a non-singular way to interpolate and compute 3D orientations, often used in control and simulation. -->


## Programming

Let's move on to maybe the most exciting part: applying the kinematics concepts you've learned in code and seeing your robot working right in front of you!

*(Please refer to the **Install Webots** section if you haven't installed it yet.)*


### Step 1: Setup your environment

1. 📁 [Download the `irl` folder](./assets/downloads/irl.zip)
2. Extract the downloaded `.zip` file.
3. Launch Webots. From the top-left corner select **File → Open World**.
4. Navigate to the extracted `irl/worlds` folder and select your `.wbt` file.



### Step 2: Let's start coding!

Once successfully opened, your robot and its environment should appear, as illustrated in the screenshot below:

<img src="{{ site.baseurl }}{{ '/assets/images/kinematics/webot_kin.png' }}" width="500px" alt="Kinematics Image">


Now, follow the instructions provided on the right side panel within Webots, and complete the code to make your robot move.

Once you've implemented all the "TODO" sections, click "Build" to compile your project, and then start the simulation.

**Good luck and have fun!**

## Ressources

### Books

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_2) (Chapter 2. Kinematics)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/pick.html) (Chapter 3. Basic Pick and Place)

### Videos

- [Introduction to Robotics: Kinematics & Modeling](https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA) (Youtube Channel by Mohammad Zainullah Khan)

- [Robotic Manipulation](https://www.youtube.com/watch?v=ZOXp_wixIzo&list=PLkx8KyIQkMfVRPReg9FHtBk_RGEwnVxU-&index=3) (MIT 2020)

---

[Back to Top](#start)