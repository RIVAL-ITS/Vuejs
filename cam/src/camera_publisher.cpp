#include "rclcpp/rclcpp.hpp"
#include "sensor_msgs/msg/compressed_image.hpp"
#include <opencv2/opencv.hpp>
#include <vector>

class CameraPublisher : public rclcpp::Node {
public:
    CameraPublisher() : Node("camera_publisher") {
        publisher_ = this->create_publisher<sensor_msgs::msg::CompressedImage>("/camera_frame/compressed", rclcpp::QoS(1).best_effort());

        cap_.open(2, cv::CAP_V4L2);
        cap_.set(cv::CAP_PROP_FRAME_WIDTH, 440);
        cap_.set(cv::CAP_PROP_FRAME_HEIGHT, 280);
        cap_.set(cv::CAP_PROP_FPS, 60);
        float width=cap_.get(cv::CAP_PROP_FRAME_WIDTH);
        float height=cap_.get(cv::CAP_PROP_FRAME_HEIGHT);

        RCLCPP_INFO(this->get_logger(),"width %f, height %f", width,height);

        if (!cap_.isOpened()) {
            RCLCPP_ERROR(this->get_logger(), "Failed to open camera!");
        }

        thread_ = std::thread(&CameraPublisher::stream, this);
    }

    ~CameraPublisher() {
        if (cap_.isOpened()) {
            cap_.release();
        }
        thread_.join();
    }

private:
    void stream() {
        while (rclcpp::ok()) {
            cv::Mat frame;
            cap_ >> frame;

            if (!frame.empty()) {
                std::vector<uchar> buf;
                cv::imencode(".jpg", frame, buf); // Simpan sebagai JPEG

                auto msg = std::make_shared<sensor_msgs::msg::CompressedImage>();
                msg->format = "jpeg";
                msg->data.assign(buf.begin(), buf.end());

                publisher_->publish(*msg);
            } else {
                RCLCPP_WARN(this->get_logger(), "Empty frame captured!");
            }

            std::this_thread::sleep_for(std::chrono::milliseconds(1));
        }
    }

    rclcpp::Publisher<sensor_msgs::msg::CompressedImage>::SharedPtr publisher_;
    cv::VideoCapture cap_;
    std::thread thread_;
};

int main(int argc, char **argv) {
    rclcpp::init(argc, argv);
    auto node = std::make_shared<CameraPublisher>();
    rclcpp::spin(node);
    rclcpp::shutdown();
    return 0;
}
