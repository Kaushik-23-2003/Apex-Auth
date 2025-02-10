import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaEdit, FaSave, FaTimes, FaUser, FaAddressCard, FaVenus, FaMars } from "react-icons/fa";
import styles from "../styles/ProfileInfo.module.css";
import { useToast } from "../contexts/ToastContext";
import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ isDarkMode, currentUser, toggleDarkMode, isSidebarVisible }) => {
  const [profileData, setProfileData] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { showToast, hideToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    const initializeProfile = async () => {
      setLoading(true);

      const fetchedData = {
        user: {
          name: currentUser.fullname || "Guest User",
          email: currentUser.email || "Not Provided",
          image: currentUser.profilePicture || "https://i.pinimg.com/564x/3b/27/a8/3b27a87fcf7d90ae564be23d7a37f778.jpg",
          verified: currentUser.accountVerified === "Verified",
        },
        personalDetails: [
          { label: "Full Name", value: currentUser.fullname || "Guest User", key: "fullname", editable: true },
          { label: "Email", value: currentUser.email || "user@gmail.com", key: "email", editable: false },
          { label: "Phone Number", value: currentUser.phoneNumber || "1234567890", key: "phoneNumber", editable: true },
          {
            label: "Date of Birth",
            value: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : "",
            key: "dob",
            editable: true,
            type: "date",
          },

          { label: "Gender", value: currentUser.gender || "Not Provided", key: "gender", editable: true, type: "gender" },
          {
            label: "Address",
            key: "address",
            value: currentUser.address || "Not Provided",
            editable: true,
            type: "address",
            fields: {
              streetNo: currentUser.address?.split(', ')[0] || "",
              areaName: currentUser.address?.split(', ')[1] || "",
              district: currentUser.address?.split(', ')[2] || "",
              state: currentUser.address?.split(', ')[3] || "",
            },
          },
        ],
        accountDetails: [
          { label: "Display Name", value: currentUser.username || "Not Provided", key: "username", editable: true },
          { label: "Membership Status", value: currentUser.membershipStatus || "Standard", key: "membershipStatus", editable: false },
          { label: "Account Verification", value: currentUser.accountVerified || "Not Verified", key: "accountVerified", editable: false },
          { label: "Language Preference", value: currentUser.languagePreference || "English", key: "languagePreference", editable: true },
         {
            label: "Account Created",
            value: currentUser.createdAt
              ? new Date(currentUser.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
              : "Not Available",
            key: "createdAt",
            editable: false,
          },
          { label: "Last Login", value: currentUser.lastLogin ? new Date(currentUser.lastLogin).toLocaleDateString() : "Not Available", key: "lastLogin", editable: false },
        ],
      };

      setProfileData(fetchedData);
      setFormData(structuredClone(fetchedData));
      setLoading(false);
    };

    initializeProfile();
  }, [currentUser]);

  const handleEditClick = () => setIsEditing(true);

  //Update User account
  const handleSaveClick = async () => {
    if (!currentUser?._id) {
      showToast("User ID is missing, cannot update profile.", "error");
      return;
    }

    try {
      const dobValue = formData.personalDetails.find((item) => item.key === "dob")?.value;
      const dobDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }

      if (dobValue && (age < 13 || age > 100)) {
        showToast("Age should be greater than 13 and below 100.", "error");
        return;
      }

      // Retrieve and clean up address fields
      const addressFields = formData.personalDetails.find((item) => item.key === "address")?.fields;
      const addressArray = [
        addressFields?.streetNo?.trim(),
        addressFields?.areaName?.trim(),
        addressFields?.district?.trim(),
        addressFields?.state?.trim(),
      ].filter(Boolean); // Remove empty values

      const formattedAddress = addressArray.length ? addressArray.join(', ') : "";

      // Prepare updated data object
      const updatedData = {
        fullname: formData.personalDetails.find((item) => item.key === "fullname")?.value,
        phoneNumber: formData.personalDetails.find((item) => item.key === "phoneNumber")?.value,
        dateOfBirth: dobValue,
        gender: formData.personalDetails.find((item) => item.key === "gender")?.value,
        address: formattedAddress,  // Ensures no duplicate values
        username: formData.accountDetails.find((item) => item.key === "username")?.value,
        languagePreference: formData.accountDetails.find((item) => item.key === "languagePreference")?.value,
      };

      const response = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const updatedUser = await response.json();

      // Update state with cleaned-up address
      setProfileData((prev) => ({
        ...prev,
        personalDetails: prev.personalDetails.map((item) => {
          let updatedValue = updatedUser[item.key] || item.value;
          if (item.key === 'address' && updatedValue) {
            const parts = updatedValue.split(', ').filter(Boolean);
            return {
              ...item,
              value: updatedValue,
              fields: {
                streetNo: parts[0] || "",
                areaName: parts[1] || "",
                district: parts[2] || "",
                state: parts[3] || "",
              }
            };
          }
          return {
            ...item,
            value: updatedValue,
          };
        }),
        accountDetails: prev.accountDetails.map((item) => ({
          ...item,
          value: updatedUser[item.key] || item.value,
        })),
      }));

      hideToast();
      showToast("Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (error) {
      showToast(`Error updating profile: ${error.message || 'Something went wrong.'}`, "error");
    }
  };

  //Reset the user details to original
  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(structuredClone(profileData));
  };

  const handleInputChange = (e, sectionKey, addressFieldKey) => {
    const { name, value } = e.target;

    if (sectionKey === "personalDetails" && name === "address") {
      setFormData((prev) => ({
        ...prev,
        personalDetails: prev.personalDetails.map(item =>
          item.key === "address" ? {
            ...item,
            fields: {
              ...item.fields,
              [addressFieldKey]: value,
            }
          } : item
        ),
      }));
    } else if (sectionKey === "personalDetails" && name === "gender") {
      setFormData(prev => ({
        ...prev,
        personalDetails: prev.personalDetails.map(item =>
          item.key === "gender" ? { ...item, value: value } : item
        )
      }));
    }
    else {
      setFormData((prev) => ({
        ...prev,
        [sectionKey]: prev[sectionKey].map((item) =>
          item.key === name ? { ...item, value } : item
        ),
      }));
    }
  };

  // Delete the user account
  const handleDeleteAccount = async () => {
    if (!currentUser?._id) {
      showToast("User ID is missing, cannot delete profile.", "error");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        showToast("User deleted successfully", "success");
        return navigate('/signin');
      } else {
        showToast(data.error || 'Failed to delete account', "error");
      }
    } catch (error) {
      showToast(`Error deleting profile: ${error.message || 'Something went wrong.'}`, "error");
    }
  };

  return (
    <div className={`${styles.wrapper} ${isSidebarVisible ? styles.sidebarVisible : styles.sidebarHidden}`}>
      <div className={`${styles.container} ${isDarkMode ? styles.darkContainer : ''}`}>
        {loading ? (
          <div className={styles.loader}>Loading...</div>
        ) : (
          <div className={styles.profileContainer}>
            <div className={`${styles.topControls} ${isDarkMode ? styles.darkTopControls : ''}`}>
              <button className={`${styles.themeToggleButton} ${isDarkMode ? styles.darkThemeToggleButton : ''}`} onClick={toggleDarkMode}>
                {isDarkMode ? "☀️ Light Mode" : "🌑 Dark Mode"}
              </button>
              <div className={styles.topRightButtons}>
                <button className={`${styles.deleteAccountButton} ${isDarkMode ? styles.darkDeleteAccountButton : ''}`} onClick={handleDeleteAccount}>
                  Delete account
                </button>
                <div className={styles.actionButtons}>
                  {isEditing ? (
                    <>
                      <button className={`${styles.actionButton} ${styles.saveButton}`} onClick={handleSaveClick}>
                        <FaSave /> Save
                      </button>
                      <button className={`${styles.actionButton} ${styles.cancelButton}`} onClick={handleCancelClick}>
                        <FaTimes /> Cancel
                      </button>
                    </>
                  ) : (
                    <div>
                      <button
                        data-tooltip-id="edit-tooltip"
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={handleEditClick}
                      >
                        <FaEdit /> Edit Profile
                      </button>
                      <Tooltip id="edit-tooltip" place="left" effect="solid" className={styles.tooltip}>
                        Edit your profile details
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Content
              profileData={profileData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              formData={formData}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Content = ({ profileData, isEditing, onInputChange, formData, isDarkMode }) => (
  <div className={`${styles.content} ${isDarkMode ? styles.darkContent : styles.lightContent}`}>
    <ContentHeader user={profileData.user} isDarkMode={isDarkMode} />
    <div className={styles.sectionsContainer}>
      <ProfileSection title="Personal Details" icon={<FaUser />} data={formData.personalDetails} isEditing={isEditing} onInputChange={onInputChange} formData={formData} isDarkMode={isDarkMode} />
      <ProfileSection title="Account Details" icon={<FaAddressCard />} data={formData.accountDetails} isEditing={isEditing} onInputChange={onInputChange} isDarkMode={isDarkMode} />
    </div>
  </div>
);

const ContentHeader = ({ user, isDarkMode }) => (
  <div className={`${styles.contentHeader} ${isDarkMode ? styles.darkContentHeader : styles.lightContentHeader}`}>
    <img alt="Profile" src={user.image} className={`${styles.profileImage} ${isDarkMode ? styles.darkProfileImage : ""}`} />
    <div className={styles.headerText}>
      <h1 className={`${styles.userName} ${isDarkMode ? styles.darkUserName : styles.lightUserName}`}>{user.name} {user.verified && <FaCheckCircle className={styles.verifiedIcon} />}</h1>
      <p className={`${styles.userEmail} ${isDarkMode ? styles.darkUserEmail : styles.lightUserEmail}`}>{user.email}</p>
    </div>
  </div>
);


const ProfileSection = ({ title, icon, data, isEditing, onInputChange, formData, isDarkMode }) => (
  <div className={`${styles.profileSection} ${isDarkMode ? styles.darkProfileSection : styles.lightProfileSection}`}>
    <SectionHeader title={title} icon={icon} isDarkMode={isDarkMode} />
    <div className={styles.sectionBody}>
      <dl className={styles.infoList}>
        {data.map((item, index) => (
          <ProfileRow key={index} item={item} isEditing={isEditing} onInputChange={onInputChange} sectionKey={title === "Personal Details" ? "personalDetails" : "accountDetails"} formData={formData} isDarkMode={isDarkMode} />
        ))}
      </dl>
    </div>
  </div>
);


const SectionHeader = ({ title, icon, isDarkMode }) => (
  <div className={`${styles.sectionHeader} ${isDarkMode ? styles.darkSectionHeader : styles.lightSectionHeader}`}>
    <h3 className={`${styles.sectionTitle} ${isDarkMode ? styles.darkSectionTitle : styles.lightSectio}`}>
      <span className={styles.sectionIcon}>{icon}</span>
      {title}
    </h3>
  </div>
);


const ProfileRow = ({ item, isEditing, onInputChange, sectionKey, formData, isDarkMode }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={`${styles.profileRow} ${isDarkMode ? styles.darkProfileRow : styles.lightProfileRow}`}>
      <dt className={`${styles.rowLabel} ${isDarkMode ? styles.darkRowLabel : styles.lightRowLabel}`}>{item.label}:</dt>
      <dd className={styles.rowValue}>
        {isEditing && item.editable ? (
          item.type === "date" ? (
            <EditableInputDate
              type="date"
              name={item.key}
              value={item.value || ''} // Use item.value or empty string if null/undefined
              onChange={(e) => onInputChange(e, sectionKey)}
              maxDate={today}
              isDarkMode={isDarkMode}
            />
          ) : item.type === "gender" ? (
            <EditableGender
              name={item.key}
              value={item.value}
              onChange={(e, genderValue) => onInputChange(e, sectionKey, genderValue)}
              isDarkMode={isDarkMode}
            />
          ) : item.type === "address" ? (
            <EditableAddress
              fields={item.fields}
              onInputChange={(e, fieldKey) => onInputChange(e, sectionKey, fieldKey)}
              isDarkMode={isDarkMode}
            />
          ) : item.key === "languagePreference" ? (
            <EditableSelect
              name={item.key}
              value={item.value}
              onChange={(e) => onInputChange(e, sectionKey)}
              options={["English", "Hindi", "Telugu", "Tamil"]}
              isDarkMode={isDarkMode}
            />
          ) : (
            <EditableInput
              type="text"
              name={item.key}
              value={item.value}
              onChange={(e) => onInputChange(e, sectionKey)}
              isDarkMode={isDarkMode}
            />
          )
        ) : (
          <ReadOnlyValue value={item.type === "gender" ? (item.value === 'Male' ? 'Male' : (item.value === 'Female' ? 'Female' : 'Not Provided')) : item.value} editable={item.editable} isDarkMode={isDarkMode} />
        )}
      </dd>
    </div>
  );
};


const EditableInput = ({ name, value, onChange, isDarkMode }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    className={`${styles.editableInput} ${isDarkMode ? styles.darkEditableInput : styles.lightEditableInput}`}
  />
);

const EditableInputDate = ({ name, value, onChange, maxDate, isDarkMode }) => (
  <input
    type="date"
    name={name}
    value={value || ''} // Use value or empty string if null/undefined here as well for input component
    onChange={onChange}
    max={maxDate}
    className={`${styles.editableInput} ${isDarkMode ? styles.darkEditableInput : styles.lightEditableInput}`}
  />
);

const EditableGender = ({ value, onChange, isDarkMode }) => (
  <div className={`${styles.editableGender} ${isDarkMode ? styles.darkEditableGender : styles.lightEditableGender}`}>
    <label>
      <input
        type="radio"
        name="gender"
        value="Male"
        checked={value === 'Male'}
        onChange={(e) => onChange(e, 'Male')}
        className={styles.genderRadio}
      />
      <FaMars className={`${styles.genderIcon} ${value === 'Male' ? styles.genderIconActive : ''}`} />
      <span className={`${styles.genderLabel} ${value === 'Male' ? 'genderActive' : ''}`}>Male</span>
    </label>
    <label>
      <input
        type="radio"
        name="gender"
        value="Female"
        checked={value === 'Female'}
        onChange={(e) => onChange(e, 'Female')}
        className={styles.genderRadio}
      />
      <FaVenus className={`${styles.genderIcon} ${value === 'Female' ? styles.genderIconActive : ''}`} />
      <span className={`${styles.genderLabel} ${value === 'Female' ? 'genderActive' : ''}`}>Female</span>
    </label>
  </div>
);


const EditableAddress = ({ fields, onInputChange, isDarkMode }) => (
  <div className={`${styles.editableAddress} ${isDarkMode ? styles.darkEditableAddress : styles.lightEditableAddress}`}>
    <div className={styles.addressField}>
      <label className={styles.addressLabel}>Street No.:</label>
      <EditableInput
        type="text"
        name="address"
        value={fields.streetNo}
        onChange={(e) => onInputChange(e, "streetNo")}
        isDarkMode={isDarkMode}
      />
    </div>
    <div className={styles.addressField}>
      <label className={styles.addressLabel}>Area Name:</label>
      <EditableInput
        type="text"
        name="address"
        value={fields.areaName}
        onChange={(e) => onInputChange(e, "areaName")}
        isDarkMode={isDarkMode}
      />
    </div>
    <div className={styles.addressField}>
      <label className={styles.addressLabel}>District:</label>
      <EditableInput
        type="text"
        name="address"
        value={fields.district}
        onChange={(e) => onInputChange(e, "district")}
        isDarkMode={isDarkMode}
      />
    </div>
    <div className={styles.addressField}>
      <label className={styles.addressLabel}>State:</label>
      <EditableInput
        type="text"
        name="address"
        value={fields.state}
        onChange={(e) => onInputChange(e, "state")}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);


const EditableSelect = ({ name, value, onChange, options, isDarkMode }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`${styles.editableSelect} ${isDarkMode ? styles.darkEditableSelect : styles.lightEditableSelect}`}
  >
    {options.map(option => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
);

const ReadOnlyValue = ({ value, editable, isDarkMode }) => (
  <span className={`${styles.readOnlyValue} ${isDarkMode ? styles.darkReadOnlyValue : ""} ${!editable ? (isDarkMode ? styles.darkStatusBadge : styles.statusBadge) : ''}`}>
    {value || "Not Available"}
  </span>
);


export default ProfilePage;