// Output variable mappings
const OUTPUT_DISPLAY_NAMES = {
    'cost_t': 'Cost',
    'bps_mean_t': 'Mean Blood Pressure',
    'gagne_sum_t': 'Gagne Comorbidity Score',
    'ldl_mean_t': 'Mean LDL Level',
    'risk_score_t': 'Risk Score'
};

// Score explanations - constant lines explaining what each score means
const SCORE_EXPLANATIONS = {
    'cost_t': 'Total medical expenditures in USD',
    'bps_mean_t': 'Mean systolic blood pressure',
    'gagne_sum_t': 'Total number of active chronic illnesses',
    'ldl_mean_t': 'Mean low-density lipoprotein'
};

// Utility function to get display name
function getOutputDisplayName(variableName) {
    return OUTPUT_DISPLAY_NAMES[variableName] || variableName;
}

// Simple function to get score explanation
function getScoreExplanation(variableName) {
    return SCORE_EXPLANATIONS[variableName] || '';
}