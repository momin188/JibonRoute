import { useState } from "react";
import { Page, Navbar, Block, Button, Link } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { Activity, Edit, AlertCircle, Plus, X } from "lucide-react";
import useAppStore from "@/store/useAppStore";

const MedicalHistoryViewPage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  const medicalHistory = user?.medicalHistory || {
    allergies: [],
    chronicConditions: [],
    currentMedications: [],
  };

  return (
    <Page>
      <Navbar
        title="Medical History"
        left={<Link onClick={() => navigate(-1)}>Back</Link>}
        right={
          <Link onClick={() => navigate("/profile/medical-history/edit")}>
            Edit
          </Link>
        }
      />

      <Block className="mt-4 pb-24">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Activity className="w-10 h-10 text-life-green" />
          </div>
          <h2 className="text-2xl font-bold">Medical Information</h2>
          <p className="text-gray-600">Your complete medical profile</p>
        </div>

        {/* Allergies */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Allergies
            </h3>
            <span className="text-sm text-gray-500">
              {medicalHistory.allergies.length} items
            </span>
          </div>

          {medicalHistory.allergies.length > 0 ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex flex-wrap gap-2">
                {medicalHistory.allergies.map((allergy, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white border border-red-300 rounded-full"
                  >
                    <span className="text-sm text-red-800 font-medium">
                      {allergy}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-sm">No allergies recorded</p>
            </div>
          )}
        </div>

        {/* Chronic Conditions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Chronic Conditions
            </h3>
            <span className="text-sm text-gray-500">
              {medicalHistory.chronicConditions.length} items
            </span>
          </div>

          {medicalHistory.chronicConditions.length > 0 ? (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="space-y-2">
                {medicalHistory.chronicConditions.map((condition, index) => (
                  <div
                    key={index}
                    className="bg-white border border-orange-300 rounded-lg p-3"
                  >
                    <span className="text-sm text-orange-800 font-medium">
                      {condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-sm">
                No chronic conditions recorded
              </p>
            </div>
          )}
        </div>

        {/* Current Medications */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              💊 Current Medications
            </h3>
            <span className="text-sm text-gray-500">
              {medicalHistory.currentMedications.length} items
            </span>
          </div>

          {medicalHistory.currentMedications.length > 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="space-y-2">
                {medicalHistory.currentMedications.map((medication, index) => (
                  <div
                    key={index}
                    className="bg-white border border-blue-300 rounded-lg p-3 flex items-center justify-between"
                  >
                    <span className="text-sm text-blue-800 font-medium">
                      {medication}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-sm">No current medications</p>
            </div>
          )}
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important</h4>
          <p className="text-sm text-yellow-700">
            This information will be shared with paramedics and medical staff
            during emergencies. Please keep it updated for your safety.
          </p>
        </div>

        <Button
          large
          className="w-full bg-life-green mt-6"
          onClick={() => navigate("/profile/medical-history/edit")}
        >
          <Edit className="w-5 h-5 mr-2" />
          Update Medical History
        </Button>
      </Block>
    </Page>
  );
};

export default MedicalHistoryViewPage;
