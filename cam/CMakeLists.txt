cmake_minimum_required(VERSION 3.8)
project(camera_publisher)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(OpenCV REQUIRED)
find_package(rosidl_default_generators REQUIRED) # Jika Anda menggunakan message custom
find_package(sensor_msgs REQUIRED)
find_package(cv_bridge REQUIRED)
find_package(image_transport REQUIRED)
find_package(OpenVINO REQUIRED)

# Export dependencies for downstream packages (important!)
ament_export_dependencies(rclcpp OpenCV sensor_msgs cv_bridge image_transport OpenVINO)
# Jika Anda punya header di direktori include

add_executable(camera_publisher src/camera_publisher.cpp)

# Use ament_target_dependencies for ROS 2 dependencies
ament_target_dependencies(camera_publisher rclcpp  sensor_msgs cv_bridge image_transport)

# Target-specific include directories (best practice)
target_include_directories(camera_publisher PUBLIC
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include>) # Include dirs project


# Link libraries (OpenCV and OpenVINO)
target_link_libraries(camera_publisher ${OpenCV_LIBRARIES})


install(TARGETS
  camera_publisher
  DESTINATION lib/${PROJECT_NAME}
)

# Install include directory (if you have one)
install(DIRECTORY include/
  DESTINATION include
)

ament_package()