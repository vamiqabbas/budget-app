import React from 'react';

type Activity = {
  action: string;
  time: string;
  type: string;
};

type RecentActivitiesProps = {
  activities: Activity[];
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => (
  <div className="bg-white rounded-lg shadow p-4 mt-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
    <ul>
      {activities.map((activity, idx) => (
        <li key={idx} className="mb-2 text-gray-700">
          <span className="font-medium">{activity.action}</span>
          <span className="ml-2 text-xs text-gray-500">{activity.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivities;